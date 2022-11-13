const ProductsService = require('../../services/products_services/products_service')
const ProductsDTO = require('../../model/DTO/products_DTO')
const Logger = require('../../logs/model/logs4js.model')
// --

class ProductsController {

    constructor() {
        this.productsService =  new ProductsService()
        this.productsDTO = new ProductsDTO()
    }

    getProducts = async (req, res) => {
        try {
            const prodID = req.params.id
            res.json(await this.productsDTO.getProducts(prodID))

        } catch(e) {
            Logger.error(e)
        }
    }

    deleteByID = async (req, res) => {
        try {
            const prodID = req.params.id
            res.json(await this.productsService.deleteByID(prodID))
        
        } catch(e) {
        Logger.error(e)
        }
    }

    saveProduct = async (req, res) => {
        try {
            res.json(await this.productsDTO.saveProduct(req.params, req.file.filename))
        } catch(e) {
        Logger.error(e)
        }
    }

    editProductByID = async (req, res) => {
        try {
            const prodID = req.params.id
            res.json(await this.productsDTO.editProductByID(prodID, req.body))
            
        } catch(e) {
            Logger.error(e)
            
        }
    }
}

// --

module.exports = ProductsController