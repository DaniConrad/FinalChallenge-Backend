const FactoryDAO = require('../../model/DAO/factory_DAO')
const config = require('../../config/config')
// --

class OrderService {
    constructor(){
        this.DAO = FactoryDAO(config.TYPE_DB)
    }

    async saveOrder(userID, cart){
        return await this.DAO.order.saveOrder(userID, cart)
    }

    async getOrders(userID){
        return await this.DAO.order.getOrders(userID)
    }

}

module.exports = OrderService