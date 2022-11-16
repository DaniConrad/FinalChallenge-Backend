const FactoryDAO = require('../../model/DAO/factory_DAO')
const config = require('../../config/config')
// --

class OrderService {
    constructor(){
        this.DAO = FactoryDAO(config.TYPE_DB)
    }

    async saveOrder(userID, prodsInCart){
        return await this.DAO.order.saveOrder(userID, prodsInCart)
    }

    async getOrders(userID){
        return await this.DAO.order.getOrders(userID)
    }

    async getOrdersByID(orderID){
        return await this.DAO.order.getOrdersByID(orderID)
    }

}

module.exports = OrderService