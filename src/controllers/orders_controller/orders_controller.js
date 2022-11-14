const OrdersDTO = require('../../model/DTO/ordersDTO')
const Logger = require('../../logs/model/logs4js.model')
// --

class OrdersController {

    constructor() {
        this.ordersDTO = new OrdersDTO()
    }
    getOrders = async (req, res) => {
        try {
            const userID = req.params.userID
            res.status(200).json(await this.ordersDTO.getOrders(userID))
        } catch (error) {
            Logger.error(error)
            res.status(404)
        }
        
    }
    
}

// --


module.exports =  OrdersController