const LoginService = require('../../services/login_services/login_service')
const loginService = new LoginService()
const Logger = require('../../logs/model/logs4js.model')

class ProductsMiddlewares {
    constructor() {}
    
    async verifyRole(req, res, next) {
       const isAdmin = await loginService.verifyRole(req.params.userID)
       isAdmin ? next() : Logger.warn('No admin')
    }

}

module.exports = new ProductsMiddlewares()
    
