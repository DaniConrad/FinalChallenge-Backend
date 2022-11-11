const OrdersService = require('../../services/order_services/order_service')

// --

class OrdersDTO {
    constructor(){
        this.ordersService = new OrdersService()
    }

    async getOrders(userID){
        const ordersView = []
        const orders = await this.ordersService.getOrders(userID)

        for (let i = 0; i < orders.length; i++) {
            const order = {
                orderID: orders[i]._id,
                orderProducts: orders[i].cart
            }
            ordersView.push(order)
        }
        return ordersView 
    }
    
}

// --

module.exports = OrdersDTO