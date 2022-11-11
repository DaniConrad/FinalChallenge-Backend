const Order = require('./order_model')

class OrderMongoDAO {

    constructor() {}
    
    async saveOrder(userID, cart){
        const newCart = await Order({user: userID, cart})
        return await newCart.save()
    }

    async getOrders(userID){
        return Order.find({user: userID})
    }
    
}  
    
module.exports = OrderMongoDAO