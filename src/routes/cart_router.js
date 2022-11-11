const express = require('express');
const CartController = require('../controllers/cart_controller/cart_controller')
// --

const router = express.Router()

// --

class CartRouter {
    constructor(){
        this.cartController = new CartController()
    }

    start() {
        router.get('/:id/products', this.cartController.getCart)
        router.post('/:id/products', this.cartController.saveCart)
        router.delete(`/:id/products/:prodId`, this.cartController.deleteProd)
        router.post('/:id/checkout', this.cartController.checkout)

        return router
    }

}


module.exports = CartRouter;