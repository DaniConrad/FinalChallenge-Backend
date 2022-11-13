const mongoose = require('mongoose');

const OrderModel = mongoose.model(
    'Order', 
    new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        cart: [],
        state: { type: String, default: 'proccesed' },
    },
    { timestamps: true }
))
module.exports = OrderModel;