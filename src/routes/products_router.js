const express = require('express');
const ProductsController = require('../controllers/products_controller/products_controller')
const multer = require('multer')
const storage = require('../helpers/multer/multer')

const ProductsMiddlewares = require('../middlewares/productsMiddlewares/productsMiddlewares')
// --

const router = express.Router()


const upload = multer({ storage: storage })

// --

class ProductsRouter {
    constructor() {
        this.productsController =  new ProductsController()
    }

    start(){
        router.get(`/:id?`, this.productsController.getProducts)
        router.delete(`/:userID/:id`, (req, res, next) => ProductsMiddlewares.verifyRole(req, res, next), this.productsController.deleteByID)
        router.post('/:userID/:name/:desc/:price/:stock/:code', (req, res, next) => ProductsMiddlewares.verifyRole(req, res, next), upload.single('prodImg'), this.productsController.saveProduct)
        router.put(`/:userID/:id`, (req, res, next) => ProductsMiddlewares.verifyRole(req, res, next), this.productsController.editProductByID)

        return router
    }
}
// --

module.exports = ProductsRouter;