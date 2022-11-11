const log4js = require('log4js')
const path = require('path')

log4js.configure({
    appenders: {
        myLoggerConsole: {type: "console"},
        infoLog: {type: "file", filename: "info.log", filename: path.join(__dirname, '../info.log')},
        errorLog: {type: "file", filename: "error.log", filename: path.join(__dirname, '../error.log')},
        warnLog: {type: "file", filename: "warn.log", filename: path.join(__dirname, '../warn.log')}
    },
    categories: {
        default: {appenders: ['myLoggerConsole', 'infoLog'], level: "trace"},
        console: {appenders: ['myLoggerConsole'], level: "debug"},
        infoLog: {appenders: ['myLoggerConsole', 'infoLog'], level: "info"},
        warnLog: {appenders: ['myLoggerConsole', 'warnLog'], level: "warn"},
        all: {appenders: ['myLoggerConsole', 'errorLog'], level: "error"},
        
    }
})

const loggerWarn = log4js.getLogger('warnLog')
const loggerInfo = log4js.getLogger('infoLog')
const loggerErrors = log4js.getLogger('all')
const loggerDebug = log4js.getLogger('console')
const loggerDefault = log4js.getLogger()

class Logger {
    constructor(){}

    error(msg){
        loggerErrors.error(msg)
    }
    warn(msg){
        loggerWarn.warn(msg)
    }
    fatal(msg){
        loggerErrors.fatal(msg)
    }
    debug(msg){
        loggerDebug.debug(msg)
    }
    info(msg){
        loggerInfo.info(msg)
    }
    all(msg){
        loggerErrors.error(msg)
    }
    trace(msg){
        loggerDefault.trace(msg)
    }

    
}

module.exports = new Logger()