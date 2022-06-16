let GameClient = require('./GameClient.js');
let Card = require('./Card.js');
let CardRepository = require('./CardRepository.js');

module.exports = class GameRulesModel{
    constructor(clientRepository) {
        this.cardTypes = [
            'r0','r1','r2','r3','r4','r5','r6','r7','r8','r9','rp','rn','rr',
            'g0','g1','g2','g3','g4','g5','g6','g7','g8','g9','gp','gn','gr',
            'b0','b1','b2','b3','b4','b5','b6','b7','b8','b9','bp','bn','br',
            'y0','y1','y2','y3','y4','y5','y6','y7','y8','y9','yp','yn','yr',
            'kg','kc','kg','kc'
        ];        
        this.clientRepository = clientRepository;
        this.cardRepository = new CardRepository();

        this.drawDeck = [];
        this.discardDeck = [];
        this.direction = true;
        this.moveIndex = 0;
        this.events = [];

        this.init();
    }
    init(){
        this.shuffleDeck();
    }    
    shuffleDeck(){
        this.moveIndex = 0;
        let j, x, i;
        for (i = this.cardTypes.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.cardTypes[i];
            this.cardTypes[i] = this.cardTypes[j];
            this.cardTypes[j] = x;
        }   
        this.cardRepository.clear(); 
        this.drawDeck = [];    
        for(let i=0; i<this.cardTypes.length; i++){
            let card = new Card(i, this.cardTypes[i]);
            card.setMoveId(this.incrementMoveIndex());
            this.cardRepository.insert(card);
            this.drawDeck.push(card);
        }
    }
    reShuffleDeck(){
        let topCard = this.discardDeck.pop();
        for(let i=0; i<this.discardDeck.length; i++){
            if(this.discardDeck[i].getNumber() === 'g'){
                this.discardDeck[i].setType("kg");
            }
            if(this.discardDeck[i].getNumber() === 'c') {
                this.discardDeck[i].setType("kc");            
            }
            this.discardDeck[i].setOwner("draw");
            let move = Math.floor(Math.random() * 1000);
            this.discardDeck[i].setMoveId(move);
            this.drawDeck.push(this.discardDeck[i]);
            this.saveEvent(this.discardDeck[i], "draw");
        }
        this.discardDeck = [];
        this.discardDeck.push(topCard);
    }
    deal(){

        this.shuffleDeck();

        this.clearEvents();

        let i, k;
        let clients = this.clientRepository.findAll();
        for (k=0; k<clients.length; k++){
            clients[k].clearCards();
        }       
        for(i=0; i<7; i++){
            for (k=0; k<clients.length; k++){
                this.takeCard(clients[k]);
            }
        }
        this.discardDeck = [];
        while(true) {
            let card = this.drawDeck.shift();
            this.placeCard(card);
            if(card.getType() !== 'kg' && card.getType() !== 'kc') {
                break;
            }
        }
        this.begin();
    }
    begin(){
        //Set all client turns to false
        GameClient.setArrayTurn(this.clientRepository.findAll(), false);
        GameClient.setArrayHasWon(this.clientRepository.findAll(), false);
        
        //Should be randomized
        this.clientRepository.get(0).setTurn(true);

        this.validateNextMove();
    }
    getNextClient(gameClient){
        let gameClientNext;
        if(this.direction){
            gameClientNext = this.clientRepository.findNext(gameClient);
        }else{
            gameClientNext = this.clientRepository.findPrevious(gameClient);
        }
        if(gameClientNext instanceof GameClient){
            return gameClientNext;
        }            
        return false;
    }
    cardCanBePlaced(card){
        let current = this.discardDeck.slice(-1)[0];
        if(typeof current === 'undefined')return false;

        //Check if card is allowed
        if(card.getNumber() === 'g'       //kg (rg,yg,bg,gg)
            || card.getNumber() === 'c'   //kc (rc,yc,bc,gc)
            || card.getColor() === current.getColor()
            || card.getNumber() === current.getNumber()){

                return true;
        }
        return false;
    }    
    finishTurn(gameClient, card){
        
        gameClient.setTakeOrLeave(false);  

        if(card instanceof Card){
            let gameClientNext = this.getNextClient(gameClient);
            if(gameClientNext instanceof GameClient){
                if(card.getNumber() === 'g'){     //pick up 4
                    this.takeCard(gameClientNext);
                    this.takeCard(gameClientNext);
                }
                if(card.getNumber() === 'p' || card.getNumber() === 'g'){     //pick up 2
                    this.takeCard(gameClientNext);
                    this.takeCard(gameClientNext);
                }            
                if(card.getNumber() === 'n' || card.getNumber() === 'p' || card.getNumber() === 'g'){     //skip
                    gameClientNext = this.getNextClient(gameClientNext);
                }           
                if(card.getNumber() === 'r'){     //reverse direction
                    this.direction = !this.direction;
                    gameClientNext = this.getNextClient(gameClient);
                }                                  
                if(gameClientNext instanceof GameClient){
                    GameClient.setArrayTurn(this.clientRepository.findAll(), false);
                    gameClientNext.setTurn(true);
                }
                if(gameClient.getCardsCount() === 0){
                    GameClient.setArrayTurn(this.clientRepository.findAll(), false);
                    GameClient.setArrayHasWon(this.clientRepository.findAll(), false);                    
                    GameClient.setArrayReady(this.clientRepository.findAll(), false);  

                    gameClient.setHasWon(true);                          
                    GameClient.calculateScores(this.clientRepository.findAll());

                    this.shuffleDeck();
                }
            }
        }else{            
            let gameClientNext = this.getNextClient(gameClient);
            if(gameClientNext instanceof GameClient){
                GameClient.setArrayTurn(this.clientRepository.findAll(), false);
                gameClientNext.setTurn(true);
            }
        }
        this.validateNextMove();
    }
    place(gameClient, cardData){

        if(!gameClient.getTurn())return false;

        if(typeof cardData.id !== 'undefined'){

            let card = this.cardRepository.findById(cardData.id);

            if(card instanceof Card){
                
                let numb = cardData.type.charAt(1);
                if((card.getType() === 'kg' || card.getType() === 'kc') && (numb === 'g' || numb === 'c')){
                    card.setType(cardData.type);
                }

                this.clearEvents();

                //Check if card is allowed
                if(this.cardCanBePlaced(card)){
                    
                    if(gameClient.removeCard(card)){
                        this.placeCard(card);
                        this.finishTurn(gameClient, card);
                    }
                }
            }
        }
    }
    take(gameClient){

        if(gameClient.getTurn()){
            
            this.clearEvents();

            if(gameClient.getTakeOrLeave()){
                this.finishTurn(gameClient);
                return;
            }

            let card = this.takeCard(gameClient);

            if(this.cardCanBePlaced(card) && !gameClient.getTakeOrLeave()){
                gameClient.setTakeOrLeave(card);
            }else{
                this.finishTurn(gameClient);
            }
            if(this.drawDeck.length == 0){
                this.reShuffleDeck();
            }
        }
    }    
    takeCard(gameClient){
        //Check for empty draw deck
        let card = this.drawDeck.pop();
        card.setMoveId(this.incrementMoveIndex());
        this.saveEvent(card, gameClient.getName());
        gameClient.addCard(card);
        return card;
    }
    placeCard(card){
        card.setMoveId(this.incrementMoveIndex());
        card.setOwner("dsc");
        this.saveEvent(card, "dsc");
        this.discardDeck.push(card);
    }
    incrementMoveIndex(){
        this.moveIndex++;
        return this.moveIndex;
    }
    saveEvent(card, owner){
        this.events.unshift({
            cardId: card.getId(),
            newOwner: owner
        });
    }
    clearEvents(){
        this.events = []
    }
    getEvents(){
        return this.events;
    }    
    getDrawDeckCount(){
        return this.drawDeck.length;
    }
    getDiscardDeck(){
        return this.discardDeck;
    }
    validateNextMove(){

        Card.setArrayNextMoveValid(this.cardRepository.findAll(), false);

        let client = this.clientRepository.findByTurn(true);
        if(client instanceof GameClient){
            let cards = client.getCards();
            for(let i=0; i<cards.length; i++){
                if(this.cardCanBePlaced(cards[i])){
                    cards[i].setNextMoveValid(true);
                }
            }
        }        

        let card = this.drawDeck.slice(-1)[0];
        if(card instanceof Card){
            card.setNextMoveValid(true);
        }
    }
    getCardRepository(){
        return this.cardRepository;
    }
};