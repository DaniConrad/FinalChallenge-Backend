const mongoose = require('mongoose');

 const UserModel = mongoose.model(
    'User', 
    new mongoose.Schema({
        email: String,
        name: String,
        phone: String,
        password: String,
        role: { type: String, default: 'user' } 
    },
    { timestamps: true }
))

module.exports = UserModel;