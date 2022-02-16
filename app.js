const express = require('express');
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const hbs = require('hbs');
const port = process.env.PORT || 2425
const cookieParser = require('cookie-parser');
const Product = require('./src/models/shop');
const csrf = require('csurf')
const csrfProtection = csrf()
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

require('./src/db/connect')
require('./config/passport')

const templatePath = path.join(__dirname,'/templates/views')
const static_path = path.join(__dirname,'/public/')
const partialPath = path.join(__dirname,'templates/partials')

// const routes= require('./routes/index')

app.set('views',templatePath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(static_path))
app.use(cookieParser())
app.use(session({secret: 'mysupersecret', resave: false, saveUninitialized:false}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(csrfProtection)

app.get('/',(req,res)=>{
    Product.find(function(err,docs){
        var productChunks = []
        var chunkSize = 3
        for( var i=0; i<docs.length; i += chunkSize){
            productChunks.push(docs.slice(i,i+chunkSize))
        }
        res.render('index',{products:productChunks})
    })
})

app.post('/product',(req,res)=>{
    try {
        const productData = new Product(req.body)
        console.log(productData)
        result = await = productData.save()
        res.status(201).send(result)
        
    } catch (error) {
        res.status(500).send(error)
    } 
})
// app.use(function(req,res,next){
//     var err = new Error('Not Found')
//     err.status = 404
//     next(err)
// })

app.get('/user/signup',(req,res)=>{
    var messages = req.flash('error')
    res.render('signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors : messages.length>0 })
})

app.post('/user/signup',passport.authenticate('local.signup',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}))

app.get('/user/profile',(req,res)=>{
    res.render('profile')
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})