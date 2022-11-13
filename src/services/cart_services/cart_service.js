const FactoryDAO = require('../../model/DAO/factory_DAO')
const sendEmail = require('../../helpers/nodemailer/nodemailer')
const connectMongo = require('../../config/mongo_config')
const config = require('../../config/config')
const OrdersService = require('../order_services/order_service')
// --


class CartService {

    constructor() {
        this.DAO = FactoryDAO(config.TYPE_DB)
        this.ordersService = new OrdersService()
    }

    async saveCart(obj, userID) {
        let cartID  
        const quantity = Number(obj.quantity)

        const verifyCart = await this.DAO.cart.verifyCartUser(userID)
        verifyCart ? cartID = verifyCart._id : cartID = await this.DAO.cart.createCart(userID)
        
        const matchProds = await this.DAO.cart.getProdInCartByID(cartID, obj._id)

        if (matchProds.products.length === 1) {
            matchProds.products[0].quantity = matchProds.products[0].quantity + quantity
            await this.DAO.cart.saveChanges()

            return matchProds
        } 

        return await this.DAO.cart.updateCart(cartID, obj._id, quantity)
    }
       

    async getCart(userID){
        let cartID
        const prodsInCart = [] 

        const verifyCart = await this.DAO.cart.verifyCartUser(userID)
        verifyCart ? cartID = verifyCart._id : cartID = null
        
        if (verifyCart) {
            for (let i = 0; i < verifyCart.products.length; i++) {
                        const prodID = verifyCart.products[i].product
                        const prodQuantity = verifyCart.products[i].quantity
                        const {_id, name, img, price, desc, stock, code} = await this.DAO.products.getProductById(prodID)
                        prodsInCart.push({_id, name, img, price, desc, stock, code, prodQuantity})
                    }
                    return prodsInCart
        }
        return []  
    }

    async deleteProd(userID, prodID){
        let cartID

        const verifyCart = await this.DAO.cart.verifyCartUser(userID)
        if (!verifyCart) return
        if (verifyCart) cartID = verifyCart._id 

        const cartWithoutItem = await this.DAO.cart.deleteProd(cartID, prodID)

        const emptyCart = await this.DAO.cart.verifyCartUser(userID)

        return emptyCart.products.length === 0 ? await this.DAO.cart.deleteCartByID(cartID) : cartWithoutItem   
    }

    async checkout(userID){
        const prodsInCart = [] 
        let cartID

        const verifyCart = await this.DAO.cart.verifyCartUser(userID)
        if (!verifyCart) return
        if (verifyCart) cartID = verifyCart._id 

        const verifyUserCheckout = await this.DAO.users.verifyUser(userID)
        if (!verifyUserCheckout) return

        const customer = {
            email: verifyUserCheckout.email,
            name: verifyUserCheckout.name,
            phone: verifyUserCheckout.phone
        }

        
        if (verifyCart) {
            for (let i = 0; i < verifyCart.products.length; i++) {
                        const prodID = verifyCart.products[i].product
                        const prodQuantity = verifyCart.products[i].quantity
                        const {name, img, price, desc, code} = await this.DAO.products.getProductById(prodID)
                        prodsInCart.push({name, img, price, desc, code, prodQuantity})
                    }
        }
        await this.ordersService.saveOrder(userID, verifyCart.products)
        await sendEmail(customer, prodsInCart)
        await this.DAO.cart.deleteCartByID(cartID)
    }
}

// --

module.exports = CartService
