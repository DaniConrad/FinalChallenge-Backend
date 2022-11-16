const Order = require('./order_model')

class OrderMongoDAO {

    constructor() {}
    
    async saveOrder(userID, prodsInCart){
        const newCart = await Order({ user: userID, products: prodsInCart })
        return await newCart.save()
    }

    async getOrders(userID){
        return Order.find({user: userID})
    }

    async getOrdersByID(orderID){
        return Order.findById({_id: orderID})
    }
    
}  
    
module.exports = OrderMongoDAO