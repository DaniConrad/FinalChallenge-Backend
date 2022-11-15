const ProductsService = require('../../services/products_services/products_service')

// --

class ProductsDTO {
    constructor(){
        this.productsService = new ProductsService()
    }

    editProductByID = async (prodID, data) => {
        return await this.productsService.editProductByID(prodID, data)
    }

    getProducts = async prodID => {
        return !prodID ? await this.productsService.getAll() : await this.productsService.getProductByID(prodID)
    } 

    saveProduct = async (obj, img) => {
        const {stock, price} = obj
        const product = {...obj, stock: Number(stock), price: Number(price), img: '/static/img/uploads/' + img}

        return await this.productsService.saveProduct(product)
    } 
    
}

// --

module.exports = ProductsDTO