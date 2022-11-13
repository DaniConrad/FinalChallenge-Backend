const config = require('./config')
const connectMongo = require('./mongo_config')
const Logger = require('../logs/model/logs4js.model')

const startDB = () => {
    switch (config.TYPE_DB) {
        case 'mongo':
            return connectMongo()
        default:
            Logger.error('DB is not found')
     }
}

module.exports = startDB



