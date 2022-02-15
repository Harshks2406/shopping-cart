const express = require('express');
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const hbs = require('hbs');
const port = process.env.PORT || 2425
const cookieParser = require('cookie-parser');
const Product = require('./src/models/shop');

require('./src/db/connect')

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

// app.use('/',routes);

app.get('/',(req,res)=>{
    Product.find(function(err,docs){
        res.render('index',{product:docs})
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


app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})