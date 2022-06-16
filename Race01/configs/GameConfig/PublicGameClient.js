/**
 * Layer over GameClient to serve data back to clients.
 * @type {module.PublicGameClient}
 */
module.exports = class PublicUNOClient {
    constructor(gameClient) {
        this.name = gameClient.getName();
        this.ready = gameClient.getReady();
        this.turn = gameClient.getTurn();
        this.cardsCount = gameClient.getCardsCount();
        this.hasWon = gameClient.getHasWon();
        this.score = gameClient.getScore();
        this.takeOrLeave = gameClient.getTakeOrLeave();        
    }
};
