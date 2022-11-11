const Chat = require('./chat_model')

class ChatMongoDAO {

    constructor() {
        
    }

    async saveMessage(userID, message){
        const newMsg = await Chat({user: userID, message})
        await newMsg.save()
    }

    async getMessages(){
        return await Chat.find({})
    }
    
}

module.exports = ChatMongoDAO