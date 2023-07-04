const mongoose = require('mongoose')
const Book = require('./book')
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})
// authorSchema.pre('deleteOne', async function(next) {
//     const books = await Book.find({author: this._id})
//     if(books.length > 0) {
//       next(new Error('This author has books still'))
//     } else {
//       next()
//     }
// })

authorSchema.pre('deleteOne', async function(next) {
  try {
    const books = await Book.find({ author: this._conditions._id });
    if (books.length > 0) {
      throw new Error('This author has books still');
    }
    // console.log("All checks passed");
    next();
  } catch (error) {
    next(error);
  }
});

// Model.find() no longer accepts a callback
module.exports = mongoose.model('Author', authorSchema)