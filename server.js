if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const app = express();
const articleRouter = require('./routes/articles');
const authRouter = require('./routes/login_and_register')
const mongoose = require('mongoose');
const Article = require('./models/articles')
const methodOverride = require('method-override')
const User = require('./models/user')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const initializePassport = require('./passport-config')





mongoose.connect('mongodb://127.0.0.1:27017/blog')


initializePassport(
  passport,
  async email => {return await User.findOne({ email: email})},
  async _id =>  {return await User.findOne({ _id: _id})}
  
  )

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())





app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc'})
  res.render('articles/index', {articles: articles, name: req.user.name})
})






app.listen(5000)

app.use('/articles', articleRouter)
app.use('/login_and_register', authRouter)