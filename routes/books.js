const express = require('express')
const router = express.Router()
const Author =  require("../models/author")
const Book = require('../models/book')
const imageMimeTypes = ['image/jpeg','image/png','image/gif']
// const multer = require("multer")
// const path = require("path")
// const fs = require("fs") 
// const uploadPath = path.join('public',Book.coverImageBasePath)
// const upload = multer({
  
//   dest: uploadPath,
//   fileFilter: (req,file,callback)=>{
//     // console.log("ggfhg")
//     // console.log(file);
//     //filename field automatically added by multer library
//     // console.log(imageMimeTypes.includes(file.mimetype))
//       callback(null,imageMimeTypes.includes(file.mimetype))
//   }
// })

// All Books Route
router.get('/', async (req, res) => {
    try{
      const books = await Book.find({}).limit(10)
      res.render('books/index', {
        books: books,
        searchOptions:req.query
      })
    }catch {
        res.render('/');
    }
})

// New Book Route
router.get('/new', async(req, res) => {
  try{
    const authors = await Author.find({})
    //console.log(authors) object type 
    const book = new Book() //create new book model
    // console.log(authors[0].id)
    res.render('books/new',{
      authors: authors,
      book: book
    })
    
  }catch{
    renderNewPage(res, new Book())
  }
})

// Create book Route
router.post('/',async (req, res) => {
  // const fileName = req.file != null ? req.file.filename : null
  // console.log(fileName);
  // console.log(req.file);
  const book = new Book({
    title:req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishdate),
    pageCount: req.body.pagecount,
    description: req.body.description
  })
  saveCover(book, req.body.cover)
  // const authors = await Author.find({})
  try{
    const newBook = await book.save()
    res.redirect(`books/${newBook.id}`)
    // res.redirect(`books`)
  }catch{
    // if(book.coverImageName!=null)
    // removeBookCover(book.coverImageName)
    renderNewPage(res, book, true)
  }
})
//Show Book Route
router.get('/:id', async (req,res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author').exec()
    // Overall, the code is fetching a book document by its ID from the database 
    // and populating the authors field with the associated author documents.
    res.render('books/show', {
    book: book
  })
  } catch{
    res.redirect('/')
  }
})
// Edit Book Route
router.get('/:id/edit', async(req,res) => {
  try {
    const book = await Book.findById(req.params.id)
    renderEditPage(res, book)
  } catch {
    res.redirect('/')
  }
})

router.put('/:id',async (req, res) => {
  let book 
  try{
    book = await Book.findById(req.params.id)
    book.title = req.body.title
    book.author = req.body.author
    book.publishDate = new Date(req.body.publishdate)
    book.pageCount = req.body.pagecount
    book.description = req.body.description
    if (req.body.cover != null && req.body.cover !== '') {
      saveCover(book, req.body.cover)
    }
    await book.save()
    res.redirect(`/books/${book.id}`)
  }catch (err){
    console.log(err)
    if(book != null) {
      renderEditPage(res, book, true)
    } else {
      res.redirect('/')
    }

  }
})

router.delete('/:id', async (req,res) => {
  let book
  try {
    await Book.deleteOne({ _id: req.params.id });     
    // book = await Book.findById(req.params.id)
    res.redirect('/books')
  } catch {
    res.render('books/show', {
      book: book,
      errorMessage: 'could not remove book'
    })
  }
})

// function removeBookCover(fileName)
// {
//   fs.unlink(path.join(uploadPath,fileName), (err) => {
//     if (err) {
//       console.error(err)
//     }
//   })
// }

async function renderEditPage(res, book, hasError = false)
{
    try {
      const authors = await Author.find({})
      const params = {
        authors: authors,
        book: book
      }
      if(hasError) params.errorMessage = 'Error Updating Book'
      res.render('books/edit', params)
    } catch {
      res.redirect('/books')
    } 
}

async function renderNewPage(res, book, hasError = false)
{
    try {
      const authors = await Author.find({})
      const params = {
        authors: authors,
        book: book
      }
      if(hasError) params.errorMessage = 'Error Crearting Book'
      res.render('books/new', params)
    } catch {
      res.redirect('/books')
    } 
}



function saveCover(book, coverEncoded)
{
  // console.log(coverEncoded)
  // string repres. of file
  if(coverEncoded==null || coverEncoded=='')return
  const cover =  JSON.parse(coverEncoded)
//   const coverEncoded = '{"title": "The Book Cover", "author": "John Doe", "year": 2023}';
// const cover = JSON.parse(coverEncoded);
// console.log(cover);
// Output:
// {
//   title: 'The Book Cover',
//   author: 'John Doe',
//   year: 2023
// }

  // console.log(cover);
  // console.log(typeof(cover))
  if(cover!=null && imageMimeTypes.includes(cover.type))
  {
    book.coverImage = new Buffer.from(cover.data, 'base64')
    book.coverImageType = cover.type
  }
}
module.exports = router
//arrow function doesnt have (this.) property