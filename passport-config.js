const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize (passport, getUserByEmail, getUserById) {
  //authenticates a user and gives them a passport if they are authenticated sucsessfully
  const authenticateUser = async (email, password, done)  => {
    const user = await getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email'})
    }

    try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect'})
        }
    } catch (error) {
      return done(error)
    }

  }
  passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
  passport.serializeUser((user, done) => done(null, user._id))
  passport.deserializeUser((_id, done) => {
    done(null, getUserById(_id));
  })
}
//await User.findOne({ email: email})
module.exports = initialize
