const FactoryDAO = require('../../model/DAO/factory_DAO')
const config = require('../../config/config')

 class ProductsService{

    constructor(){
        this.DAO = FactoryDAO(config.TYPE_DB)
    }
    
    async saveProduct(obj){
        return await this.DAO.products.saveProduct(obj)
    }

    async getById(prodID){
        return await this.DAO.products.getById(prodID)
    }

    async deleteByID(prodID){
        return await this.DAO.products.deleteByID(prodID)
    }
        
    async editProductByID(prodID, data){ 
        return await this.DAO.products.editProductByID(prodID, data)
    }

    async getAll(){
        return await this.DAO.products.getAll()
    }

    async getProductByID(prodID){
        return await this.DAO.products.getProductById(prodID)
    }


}

// --

module.exports = ProductsService


// ---