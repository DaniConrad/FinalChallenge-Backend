const mongoose = require('mongoose');

const ChatModel = mongoose.model(
    'Chat', 
    new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        messages: [{
            message: String
        }],
    },
    { timestamps: true }
))
module.exports = ChatModel;