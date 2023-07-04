// const express  =  require("express")
// const router = express.Router()
// // all authors route

// router.get("/",(req,res)=>{
    
//     res.render("authors/index")
// })

// // new author route
// router.get('/authors/new',(req,res)=>{
//     res.render("authors/new")
// })
// //create author route
// router.post("/",(req,res)=>{
//     res.send(req.body.name)
// })
// module.exports = router



const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')

// All Authors Route
router.get('/', async (req, res) => {
  // console.log("inside author")
  let searchOptions = {}
  // console.log(typeof(searchOptions))
  if (req.query.name != null && req.query.name !== '') {
    //RegExp() creates a regular expression object, which is a powerful tool for pattern matching in strings.
    searchOptions.name = new RegExp(req.query.name,'i')  //finding pattern //i is for case insensitive;
  }
  
  try {
    // console.log("searchOptions.name="+searchOptions.name)  searchOptions.name is a regular expression object
    const authors = await Author.find(searchOptions)
    // console.log("authors="+authors)
    // console.log(req.query);
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query 
      //, author: new Author()
    })
  } catch {
    res.redirect('/')
  }
  
})


// New Author Route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() })
})


// Create Author Route
router.post('/', async (req, res) => {
  console.log("inside author")
  const author = new Author({
    name: req.body.name
  })
  try {
    const newAuthor = await author.save()
    console.log("inside try author")
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect('authors')
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author'
    })
  }
})

router.get('/:id',async(req,res) =>{
  try {
    const author = await Author.findById(req.params.id)
    const books = await Book.find({author: author.id}).limit(6).exec()
    res.render('authors/show',{
      author: author,
      booksByAuthor: books
  })
  } catch {
    res.redirect('/')
  }
})

router.get('/:id/edit', async(req,res) => {
  try{
    const author = await Author.findById(req.params.id)
    res.render('authors/edit', { author: author })

  }catch{
    res.redirect('/authors')
  }
}) 

router.put('/:id', async(req,res) => {
  let author  
  try {
    author = await Author.findById(req.params.id)
    author.name = req.body.name
    await author.save()
    res.redirect(`/authors/${author.id}`)
  } catch {
    if(author == null){
      res.redirect('/')
    }
    else{
    res.render('authors/edit', {
      author: author,
      errorMessage: 'Error updating Author'
    })
  }
  }
})

router.delete('/:id', async(req,res) => {
  let author  
  try {
    await Author.deleteOne({ _id: req.params.id });
    console.log(author)
    // await author.remove()
    res.redirect('/authors')
  } catch(err) {
    console.log(err)
    if(author == null){
      res.redirect('/')
    }
    else{
    res.redirect(`/authors/${author.id}`)
  }
  }
})
module.exports = router