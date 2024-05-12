const express = require('express')
const User = require('./../models/user')
const passport = require('passport')
const router = express.Router()


//route to show login page
router.get('/login', (req, res) => {
  res.render('login.ejs')
})

//route to show register page
router.get('/register', (req, res) => {
  res.render('register.ejs')
})


//route to register a user
router.post('/register', async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  try{
    user = await user.save()
    res.redirect('/login_and_register/login')
  }catch(e){
    console.log(e)
    res.render('/register')
  }


})


//route to authenticate a user and redirect to the correct page
router.post('/login', passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/login_and_register/login',
  failureFlash: true

}))

module.exports = router