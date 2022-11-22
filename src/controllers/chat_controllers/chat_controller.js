const Logger = require('../../logs/model/logs4js.model')
const ChatServices = require('../../services/chat_services/chat_service')

class ChatController {

    constructor() {
        this.chatService = new ChatServices()
    }

    saveMessage = async (user, message) => {
        try {
            this.chatService.saveMessage(user._id, message)
        } catch (error) {
            Logger.error("chat_controller.js", error)
        }
    }

    getMessages = async () => {
        try {
            return this.chatService.getMessages()
        } catch (error) {
            Logger.error("chat_controller.js", error)
        }
    }
    
}

module.exports =  ChatController