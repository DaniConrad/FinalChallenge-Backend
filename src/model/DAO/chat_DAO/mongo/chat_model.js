const mongoose = require('mongoose');

const ChatModel = mongoose.model(
    'Chat', 
    new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: { type: String }
    },
    { timestamps: true }
))
module.exports = ChatModel;