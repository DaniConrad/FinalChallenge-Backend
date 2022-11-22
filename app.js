const express = require('express')
const session = require('express-session')
const passport = require('passport')
const http = require('http');
const ProductsRouter = require('./src/routes/products_router')
const CartRouter = require('./src/routes/cart_router')
const LoginRouter = require('./src/routes/login_router')
const OrdersRouter = require('./src/routes/orders_router')
const Logger = require('./src/logs/model/logs4js.model')
const cors = require('cors')
require('dotenv').config();
const path = require('path')
const cookieParser = require('cookie-parser')
const startDB = require('./src/config/db.config')

// -- Initializers 
const app = express()
const PORT = process.env.PORT || 8080 
const httpServer = http.createServer(app);

//  Initializing routers 
const cartRouter = new CartRouter()
const productsRouter = new ProductsRouter()
const loginRouter = new LoginRouter()
const ordersRouter = new OrdersRouter()

// -- Middlewares
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 100000,
        secure: false,
        httpOnly: false
    }
}))
app.use(passport.initialize())
app.use(passport.session())
require('./src/helpers/passport/passport')
app.use('/static', express.static(path.join(__dirname, './src/public')));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(cookieParser())

// main route advise 
app.get('/', (req, res) => {
    res.send('Success!')
})

// Routers 
app.use('/api', loginRouter.start())
app.use('/api/cart', cartRouter.start())
app.use('/api/products', productsRouter.start())
app.use('/api/orders', ordersRouter.start())
  
// -- Launch
const server = httpServer.listen(PORT, () => {
    Logger.info(`Server http on ${PORT}...`)
    startDB()
}) 
server.on('error', error => Logger.error(error)) 
