let ClientRepository = require('../ClientRepository.js');

/**
 * Client storage class
 * @type {module.ClientRepository}
 */
module.exports = class UNOClientRepository extends ClientRepository{
    constructor(){
        super();
    }
    findByHasWon(hasWon){
        return this.clients.find(function(elem){return elem.hasWon === hasWon;});
    }
    findByTurn(turn){
        return this.clients.find(function(elem){return elem.getTurn() === turn;});
    }    
};