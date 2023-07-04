const mongoose = require('mongoose')
// const path = require('path')
// const coverImageBasePath = 'uploads/bookCovers'

const bookschema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  publishDate: {
    type:Date,
    required:true
  },
  pageCount: {
    type:Number,
    required:true
  },
  description: {
    type:String
  },
  createdAt: {
    type: Date,
    required:true,
    default: Date.now
  },
  coverImage: {
    type: Buffer ,
    required: true
  },
  coverImageType:{
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  }
})

bookschema.virtual('coverImagePath').get(function(){
  if(this.coverImage != null && this.coverImageType != null){
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})

// To use this virtual property, you would typically retrieve a book instance from the database and access
//  the coverImagePath property like a regular property. For example:

// javascript
// Copy code
// const book = await Book.findById(bookId);
// console.log(book.coverImagePath);
// Assuming Book is a Mongoose model, this code retrieves a book instance by its bookId from the database 
// and logs the coverImagePath property. The get() function defined in the virtual property will be executed,
//  and if the conditions are met, it will construct and return the data URI representing the cover image.


module.exports = mongoose.model('Book', bookschema)
// module.exports.coverImageBasePath = coverImageBasePath