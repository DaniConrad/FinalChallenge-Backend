const UsersBaseDAO = require('../users_base_DAO')
const Users = require('./user_model')

class UsersMongoDAO extends UsersBaseDAO {

    constructor() {
        super();
    }

    verifyUser = async userID => {
        return await Users.findById({_id : userID})
    }

    getByEmail = async entryEmail => {
        return await Users.findOne({email: entryEmail})
    }

    getByIDWithCallBack = async (userID, cb) => {
        const user = await Users.findById({_id : userID})
        cb(null, user)
    }

     getByEmailWithCallBack = async (entryEmail, cb) => {
        const user = await Users.findOne({email: entryEmail})
        cb('', user)                                                                                                                                        
    }

    createUser = async (newUser, cb) => {
        const userCreated = await Users.create(newUser)
        return cb(userCreated)
    }
}

module.exports = UsersMongoDAO