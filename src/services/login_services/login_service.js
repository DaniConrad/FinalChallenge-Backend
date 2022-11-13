const FactoryDAO = require('../../model/DAO/factory_DAO')
const config = require('../../config/config')
const bcryptjsHelper = require('../../helpers/bcryptjs/bcrypt')

// --

class LoginService {

    constructor() {
        this.DAO = FactoryDAO(config.TYPE_DB)
        this.userID = {}
    }

    verifyUser = async userID => {
        return await this.DAO.users.verifyUser(userID)
    }

    getByEmail = async entryEmail => {
        return await this.DAO.users.getByEmail(entryEmail) 
    }

    getByIDWithCallBack = async (userID, cb) => {
        await this.DAO.users.getByIDWithCallBack(userID, cb)
    }

     getByEmailWithCallBack = async (entryEmail, cb) => {
        await this.DAO.users.getByEmailWithCallBack(entryEmail, cb)
    }

    createUser = async (newUser, cb) => {
        return await this.DAO.users.createUser(newUser, cb)
    }

    verifyPass = async (entryPass, userFind) => {
        return await bcryptjsHelper.comparePass(entryPass, userFind.password) 
    }

    getActualUser = async (userID) => {
        const searchUser = await this.DAO.users.verifyUser(userID)

        const user = {
            _id: searchUser._id,
            email: searchUser.email,
            name: searchUser.name,
        }

        return user
    }

    verifyRole = async (userID) => {
        return await this.DAO.users.verifyRole(userID)
    }
}

module.exports = LoginService