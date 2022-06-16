
module.exports = class GameActionHandler{
    constructor(gameService){
        this.gameService = gameService;
    }
    getGameService(){
        return this.gameService;
    }
    handleAction(data){

    }    
};