const OrdersDTO = require('../../model/DTO/ordersDTO')
const Logger = require('../../logs/model/logs4js.model')
const OrdersService = require('../../services/order_services/order_service')
// --

class OrdersController {

    constructor() {
        this.ordersDTO = new OrdersDTO()
        this.ordersService = new OrdersService()
    }
    getOrders = async (req, res) => {
        try {
            const userID = req.params.userID
            res.status(200).json(await this.ordersService.getOrders(userID))
        } catch (error) {
            Logger.error(error)
            res.status(404)
        }
        
    }

    getOrdersByID = async (req, res) => {
        try {
            const orderID = req.params.orderID
            res.status(200).json(await this.ordersService.getOrdersByID(orderID))
        } catch (error) {
            Logger.error(error)
            res.status(404)
        }
    }
    
}

// --


module.exports =  OrdersController