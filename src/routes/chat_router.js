const express = require('express');
const ChatController = require('../controllers/chat_controllers/chat_controller')
// --

const router = express.Router()

// --


class ChatRouter {
    constructor(){
        this.chatController = new ChatController()
    }

    start() {

        return router
    }

}


module.exports = ChatRouter;