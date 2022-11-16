const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const LoginService = require('../../services/login_services/login_service')
const bcryptjsHelper = require('../bcryptjs/bcrypt')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const Logger = require('../../logs/model/logs4js.model')

// -- Initializers

const loginService = new LoginService()

//--

passport.use('login', new LocalStrategy(
    async (entryEmail, entryPassword, done) => {
        try {
            const userFind = await loginService.getByEmail(entryEmail.toLowerCase())
            if (!userFind) return done(null, false, { message: 'user not found' })
                
            const validate = await loginService.verifyPass(entryPassword, userFind)
            if(validate === false) return done(null, false, { message: 'password error' })
            
            return done(null, userFind, { message: 'Login successfull' })

        } catch (e) {
            Logger.error(e)
            return done(e)
        }
    }
))

passport.use('signup', new LocalStrategy({ passReqToCallback: true }, 
    async (req, email, entryPassword, done) => {
        try {
            await loginService.getByEmailWithCallBack(email.toLowerCase(), async(err, user) => {
                if(err) return done(err)
                if (user) return done(null, false, { message: 'exists' })
                    
                const password = await bcryptjsHelper.hashPass(entryPassword)
                const newUser = { email: email.toLowerCase(), password, name: req.body.name, phone:req.body.phone}
                    
                await loginService.createUser(newUser, (userWithID) => {
                    if(err) return done(err)
                    return done(null, userWithID)
                })
            })
            
            
        } catch (e) {
            Logger.error(e)
            return done(e)
        }
    }
))

passport.use('jwt', new JWTStrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    console.log(token);
    try {
        return done(null, token.user)
    } catch (e) {
        Logger.error(e)
        done(error)
    }
}))

passport.serializeUser((user, done) => {
    loginService.getByIDWithCallBack(user._id, done)
})

passport.deserializeUser((user, done) => {
    loginService.getByIDWithCallBack(user._id, done)
})

// --
