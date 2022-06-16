module.exports = class GameService{
    constructor(id, messageRepository, clientRepository) {
        this.id = id;
        this.messagesRepository = messageRepository;
        this.clientRepository = clientRepository;
        this.actionHandlers = {};
    }
    handleAction(socket, action, data){
        data.socketId = socket.id;
        for(let key in this.actionHandlers){
            if(key === action){                
                this.actionHandlers[key].handleAction(data);
                break;
            }
        }
    }
    getClientResponseData(socketId){
        return false;
    }
    getClientRepository(){
        return this.clientRepository;
    }
    getMessageRepository(){
        return this.messagesRepository;
    }    
};