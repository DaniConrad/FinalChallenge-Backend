const Products = require('./products_model')
const ProductsBaseDAO = require('../products_base_DAO')
// --


class ProductsMongoDAO extends ProductsBaseDAO {

    constructor() {
        super();
    }

    saveProduct = async (data) => {
        return await new Products(data).save() ? true : false
    }

    getProductById = async (prodID) => {
        return await Products.findById({_id: prodID})
    }

    editProductByID = async (prodID, data) => {
        return await Products.findOneAndUpdate({ _id: prodID}, { $set: data}, {new: true})
    }

    getAll = async () => {
        return Products.find({})
    }

    deleteByID = async (prodID) => {
        return await Products.findOneAndDelete({_id: prodID}) ? true : false
    }

}
// --

module.exports = ProductsMongoDAO