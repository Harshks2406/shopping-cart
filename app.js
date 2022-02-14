const express = require('express');
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const hbs = require('hbs');
const port = process.env.PORT || 2425
const cookieParser = require('cookie-parser')


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
    res.render('index.hbs')
})

// app.use(function(req,res,next){
//     var err = new Error('Not Found')
//     err.status = 404
//     next(err)
// })

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})