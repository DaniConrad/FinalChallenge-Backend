const CartService = require('../../services/cart_services/cart_service')
const Logger = require('../../logs/model/logs4js.model')

class CartController {

    constructor() {
        this.cartService =  new CartService()
    }

    getCart = async (req, res) => {
        try {
            const userID = req.params.id
            res.json(await this.cartService.getCart(userID))
        } catch(e) {
            Logger.error(e)
            
        }
    }

    saveCart = async (req, res) => {
        try {
            const userID = req.params.id
            res.json(await this.cartService.saveCart(req.body, userID))
        } catch(e) {
            Logger.error(e)
        }
    }

    deleteProd = async (req, res) => {
        try {
            const userID = req.params.id
            const prodID = req.params.prodId
            res.json(await this.cartService.deleteProd(userID, prodID))
        } catch(e) {
            Logger.error(e)
        }
    }

    checkout = async (req, res) => {
        try {
            const userID = req.params.id
            res.json(await this.cartService.checkout(userID))
        } catch(e) {
            Logger.error(e)
        }
    }

}

module.exports =  CartController