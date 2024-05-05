const express = require('express')
const User = require('./../models/user')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login.ejs')
})

router.get('/register', (req, res) => {
  res.render('register.ejs')
})

router.post('/register', async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  try{
    user = await user.save()
    res.redirect('/')
  }catch(e){
    console.log(e)
    res.render('/register')
  }


})

router.post('/login', (req, res) => {

})

module.exports = router