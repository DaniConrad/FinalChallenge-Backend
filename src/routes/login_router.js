// -- Dependencies --
const express = require('express');
const passport = require('passport')
const LoginController = require('../controllers/login_controller/login_controller');

// -- Initializers --

const router = express.Router()

// -- Middlewares -- 

const authMiddlewares = require('../middlewares/authMiddlewares/authMiddlewares')

// -- Routes --

class LoginRouter {

    constructor(){
        this.loginController = new LoginController()
    }

    start() {
        router.post('/login', (req, res, next) => authMiddlewares.login(req, res, next))
        router.post('/signup', (req, res, next) =>  authMiddlewares.signUp(req, res, next))
        router.get('/logout', this.loginController.logout)
        router.get('/profile', passport.authenticate('jwt', { session: false }), this.loginController.protectedRoute)
        
        return router
        
    }
    
}



// -- 

module.exports =  LoginRouter
    
            
