const express = require('express');
const OrdersController = require('../controllers/orders_controller/orders_controller')
// --

const router = express.Router()

// --

class OrdersRouter {
    constructor(){
        this.ordersController = new OrdersController()
    }

    start() {
        router.get('/:userID', this.ordersController.getOrders)

        return router
    }

}


module.exports = OrdersRouter;