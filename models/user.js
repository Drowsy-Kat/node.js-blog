const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// creates a mongoDB table for users
const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }
})


// emcrypts the users password
userSchema.pre('validate', async function(next){
  if (this.password){
    try {
      this.password = await bcrypt.hash(this.password, 10)
    } catch (error) {
      console.log(error)
    }
  }
})

module.exports = mongoose.model('User', userSchema)