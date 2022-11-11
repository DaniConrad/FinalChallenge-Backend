const mongoose = require('mongoose')
const Logger = require('../logs/model/logs4js.model')
const config = require('./config')

// --

const connectMongo = () => {
    mongoose.connect(`mongodb+srv://Dani:${config.MONGO_CONNECT}@codercluster.d4xxn.mongodb.net/?retryWrites=true&w=majority`)
        .then(() => {
            Logger.info('MongoDB connected');
        })
        
}

module.exports = connectMongo