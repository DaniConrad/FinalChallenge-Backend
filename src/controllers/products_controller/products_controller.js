const ProductsService = require('../../services/products_services/products_service')
const ProductsDTO = require('../../model/DTO/products_DTO')

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
            console.log("products_controller.js ~ line 20", e)
        }
    }

    deleteByID = async (req, res) => {
        try {
            const prodID = req.params.id
            res.json(await this.productsService.deleteByID(prodID))
        
        } catch(e) {
        console.log("products_controller.js ~ line 30", e)
        }
    }

    saveProduct = async (req, res) => {
        try {
            res.json(await this.productsDTO.saveProduct(req.params, req.file.filename))

        } catch(e) {
        console.log("line 39 ~ ProductsController", e)
        }
    }

    editProductByID = async (req, res) => {
        try {
            const prodID = req.params.id
            res.json(await this.productsDTO.editProductByID(prodID, req.body))
            
        } catch(e) {
            console.log("line 56 ~ ProductsController ~ editProductByID", e)
            
        }
    }

}

// --

module.exports = ProductsController