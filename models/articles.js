const mongoose = require('mongoose')
const slugify = require('slugify')
const { marked } = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)



// creates a mongoDB table for the articles
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true,
  }
})

//creates a unique slug for the article
articleSchema.pre('validate', function(next){
  if (this.title) {
    this.slug = slugify(this.title, {lower: true, strict: true})
  }
  //convets markdown into santised html
  if(this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
  }

  next()
})

module.exports = mongoose.model('Article', articleSchema)
