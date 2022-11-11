const express = require('express');
const ProductsController = require('../controllers/products_controller/products_controller')

const multer = require('multer')
const storage = require('../helpers/multer/multer')
// --

const router = express.Router()


const upload = multer({ storage: storage })
// --

class ProductsRouter {
    constructor(){
        this.productsController =  new ProductsController()
    }

    start(){
        router.get(`/:id?`, this.productsController.getProducts)
        router.delete(`/:id`, this.productsController.deleteByID)
        router.post('/:name/:desc/:price/:stock/:code', upload.single('prodImg'), this.productsController.saveProduct)
        router.put(`/:id`, this.productsController.editProductByID)

        return router
    }
}
// --

module.exports = ProductsRouter;