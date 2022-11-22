const CartMongoDAO = require('./cart_DAO/mongo/cart_mongo_DAO')
const ProductsMongoDAO = require('./products_DAO/mongo/products_mongo_DAO')
const UsersMongoDAO = require('./users_DAO/mongo/user_mongo_DAO')
const OrderMongoDAO = require('./order_DAO/mongo/order_mongo_DAO')

const FactoryDAO = (typeDB) => {
    
    switch (typeDB) {
        case 'mongo':
            return {
                cart: new CartMongoDAO(),
                products: new ProductsMongoDAO(),
                users: new UsersMongoDAO(),
                order: new OrderMongoDAO()
            }

        default:
            throw new Error('This db is not found')
            
    }

}

module.exports = FactoryDAO