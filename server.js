if(process.env.NODE_ENV != 'production') {
  require('dotenv').load()
}

// const now = new Date();
// const isoString = now.toISOString();

// console.log(isoString.split('T')[0]);

const express = require("express")
const app = express()
const os = require('os')
const expressLayouts = require("express-ejs-layouts")
//Without the layout support, you won't be able to define a common layout file for your views. 
const morgan=require('morgan'); //to show routes in console
const bodyParser = require('body-parser');
//'body-parser' module is commonly used in Node.js 
// applications to parse the incoming request bodies.
const methodOverride = require('method-override')
// to override method like put post get 

const indexrouter = require("./routes/index")
const authorrouter = require("./routes/authors")
const bookrouter = require("./routes/books")

app.use(morgan('dev')) //for path viewer
app.set("view engine" , "ejs")
app.set("views",__dirname + "/views")
app.set("layout","layouts/layout")
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static("public"))
// to serve static files from the "public" directory.
app.use(bodyParser.urlencoded({limit : '10mb', extended:false}))


const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true})
//{ useNewUrlParser: true } is provided to use the new URL parser for connection string parsing.
// This option is recommended when using a MongoDB driver version that supports it.
const db = mongoose.connection
db.on('error', error => console.error(error))  //whenever there is an error in the MongoDB connection, 
db.once('open', () => console.log('Connected to Mongoose'))// when the MongoDB connection is successfully opened
console.log(os.freemem())

//other way of connecting
// const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017",{
//     useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
//     console.log(`connection is successful`);
// }).catch((e)=>{
//     console.log(`no connection`)
// })


app.use('/',indexrouter)
app.use('/authors',authorrouter)
app.use('/books',bookrouter)


app.listen(process.env.PORT || 3000)