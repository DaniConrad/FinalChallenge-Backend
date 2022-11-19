const FactoryDAO = require('../../model/DAO/factory_DAO')
const config = require('../../config/config')
// --


class CartService {

    constructor() {
        this.DAO = FactoryDAO(config.TYPE_DB)
    }

    async getMessages(){
        return this.DAO.chat.getMessages()
    } 

    async saveMessage(userID, message){
        return this.DAO.chat.saveMessage(userID, message)
    } 
}

// --

module.exports = CartService
