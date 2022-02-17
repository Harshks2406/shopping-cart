const express = require('express')
const router = express.Router()
const Product = require('../src/models/shop');

router.get('/',(req,res)=>{
    Product.find(function(err,docs){
        var productChunks = []
        var chunkSize = 3
        for( var i=0; i<docs.length; i += chunkSize){
            productChunks.push(docs.slice(i,i+chunkSize))
        }
        res.render('index',{products:productChunks})
    })
})
module.exports = router