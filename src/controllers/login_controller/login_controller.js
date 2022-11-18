const LoginService = require('../../services/login_services/login_service')
const LoginDTO = require('../../model/DTO/login_DTO')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const Logger = require('../../logs/model/logs4js.model')
// --

class LoginController {

    constructor() {
        this.loginService =  new LoginService()
        this.loginDTO = new LoginDTO()
    }

    postLogin = async (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => {
           try {
                if (!user) return res.json(info)
                
                req.login(user, { session: false }, async (err) => {
                    if (err) return next(err)
                    const body = { _id: user._id, email: user.email, name: user.name }
          
                    const token = jwt.sign({ user: body }, 'top_secret')
                    return res.json({ body, token })
                })
            }
            catch(e) {
                return (
                    next(e),
                    Logger.warn(e)
                )
            }
        })(req, res, next)
    }
    

    postSignUp = async (req, res, next) => {
        passport.authenticate('signup', async (err, user, info) => {
            try {
                if (user) return res.json(info)
                res.json(user)
             }
             catch(e) {
                return (
                    next(e),
                    Logger.warn(e)
                )
             }
         })(req, res, next)
    }
    

    logout = async (req, res) => {
        // this.session.destroy()
        console.log(this.session);
    }

    protectedRoute = (req, res) => {
        res.json({ user: req.user })
    }


}

// --


module.exports =  LoginController