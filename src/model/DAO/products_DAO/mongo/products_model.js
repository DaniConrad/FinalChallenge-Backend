const mongoose = require('mongoose');

const ProductsModel = mongoose.model(
    'Products', 
    new mongoose.Schema({
        name: String,
        img: String,
        price: Number,
        desc: String,
        stock: Number,
        code: String
    })
)
module.exports = ProductsModel;