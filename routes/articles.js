const express = require('express')
const Article = require('./../models/articles')
const router = express.Router()

//function to save an article or any changes made to one and redirect the next page
function saveArticleAndRedirect(path)
{
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
  
    
    try{
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    }catch (e){
      res.render(`articles/${path}`, {article: article})
    }
  }
}

//route to create new articles page
router.get('/new', (req, res) => {
  res.render('articles/new', {article: new Article()})
})

//route for edit articles page
router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', {article: article})
})

router.put('/:id', async (req, res,next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))


//route to view articles
router.get('/:slug', async (req, res) =>{
  const article = await Article.findOne({ slug: req.params.slug})
  if (article == null) res.redirect('/')
  res.render('articles/show', {article: article})
})


//saves an article
router.post('/', async (req, res,next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))


//route to delete an article
router.delete('/:id', async (req, res) =>{
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router