const passport = require('passport')
const jwt = require('jsonwebtoken')
// --

class authMiddlewares {
    constructor(){}

    // Passport functions have references in helpers/passport folder.
    
    login(req, res, next){
        passport.authenticate('login', async (err, user, info) => {
            try {
              if(err) return res.status(401).json({ message: 'error' })
              if(!user) return res.status(401).json({ user: false })
              
              req.login(user, { session: false }, async (err) => {
                if (err) return next(err)
                const body = { _id: user._id, email: user.email, name: user.name, role: user.role }
      
                const token = jwt.sign({ user: body }, 'top_secret')
                return res.status(200).json({ body, token })
              })
            }
            catch(e) {
              return next(e)
            }
          })(req, res, next)
    }

    signUp(req, res, next) {
      passport.authenticate('signup', async (err, user, info) => {
          try {
              if (!user || err) return res.status(401).json({ user: false })
              res.status(200).json({userID: user._id})
           }
           catch(e) {
               return next(e)
           }
       })(req, res, next)
    }
}


module.exports = new authMiddlewares()
