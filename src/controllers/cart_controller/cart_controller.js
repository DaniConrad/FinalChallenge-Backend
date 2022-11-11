const CartService = require('../../services/cart_services/cart_service')

class CartController {

    constructor() {
        this.cartService =  new CartService()
    }

    getCart = async (req, res) => {
        try {
            const userID = req.params.id
            res.json(await this.cartService.getCart(userID))
        } catch(e) {
            console.log("🚀 ~ file: cart_controller.js ~ line 15 ~ CartController ~ getCart= ~ e", e)
            
        }
    }

    saveCart = async (req, res) => {
        try {
            const userID = req.params.id
            res.json(await this.cartService.saveCart(req.body, userID))
        } catch(e) {
            console.log('Error to save cart', e);
        }
    }

    deleteProd = async (req, res) => {
        try {
            const userID = req.params.id
            const prodID = req.params.prodId
            res.json(await this.cartService.deleteProd(userID, prodID))
        } catch(e) {
            console.log('Error to delete prod', e);
        }
    }

    checkout = async (req, res) => {
        try {
            const userID = req.params.id
            res.json(await this.cartService.checkout(userID))
        } catch(e) {
            console.log('Error in checkout', e);
        }
    }

}

module.exports =  CartController