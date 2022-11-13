const mongoose = require('mongoose');

const CartModel = mongoose.model(
    'Cart', 
    new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        products: [{
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
            quantity: {
              type: Number,
              default: 1,
            }
        }]
    },
    { timestamps: true }
))
module.exports = CartModel;