const express = require('express');
const articleRouter = require('./routes/articles');
const authRouter = require('./routes/login_and_register')
const mongoose = require('mongoose');
const Article = require('./models/articles')
const methodOverride = require('method-override')
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/blog')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc'})
  res.render('articles/index', {articles: articles})
})






app.listen(5000)

app.use('/articles', articleRouter)
app.use('/login_and_register', authRouter)