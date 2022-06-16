let GameActionHandler = require('../GameActionHandler.js');
let GameClient = require('./GameClient.js');

module.exports = class TakeCardActionHandler extends GameActionHandler {
    constructor(gameService){
        super(gameService);
    }
    handleAction(data){
        let client = this.getGameService().getClientRepository().findByName(data.client.name);
        if(client instanceof GameClient){
            this.getGameService().getGameRulesModel().take(client);            
        }
    }
};