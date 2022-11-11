const express = require('express');
const ChatController = require('../controllers/chat_controllers/chat_controller')
// --

const router = express.Router()

// --


class ChatRouter {
    constructor(){
        this.chatController = new ChatController()
    }

    start(server1) {
        const io = require('socket.io')(server1, {
            cors: {
                origin: "http://localhost:3000"
            }
        });
        router.get('/chat', this.chatController.startChat)

        return router
    }

}


module.exports = ChatRouter;