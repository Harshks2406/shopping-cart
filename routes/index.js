const express = require('express');
const Cart = require('../src/models/cart');
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

router.get('/add-to-cart/:id',(req,res,next)=>{
    const productId = req.params.id
    const cart = new Cart(req.session.cart ? req.session.cart : {})
    
    Product.findById(productId, (err,product)=>{
        if(err){
            return res.redirect('/')
        }
        cart.add(product,product.id)
        req.session.cart = cart
        console.log(req.session.cart)
        res.redirect('/')
    })
})

router.get('/shopping-cart',(req,res)=>{
    if(!req.session.cart){
        return res.render('shopping-cart',{products: null})
    }
    var cart = new Cart(req.session.cart)
    res.render('shopping-cart',{products: cart.generateArray(),totalPrice: cart.totalPrice})
})

router.get('/checkout',(req,res)=>{
    if(!req.session.cart){
        return res.redirect('shopping-cart')
    }
    var cart = new Cart(req.session.cart)
    res.render('checkout',{total: cart.totalPrice,csrfToken: req.csrfToken()})
})

router.post('/checkout',(req,res)=>{
    if(!req.session.cart){
        return res.redirect('shopping-cart')
    }
    var cart = new Cart(req.session.cart)

    var stripe = require("stripe")('sk_test_51KUE6ySIReiC7K1bD4htaGWqtCc1iE5iFc4wbtb54o38fV6JmoH5aCH4Qxxit9zacjq7FCdc2pAY9xXwrqf3XxG800w2dUgeOw')
    stripe.charges.create({
        amount: cart.totalPrice*100,
        currency: "usd",
        source: response.id,
        description: "test charge"
    },function(err,charge){
        if(err){
            req.flash('error',err.message)
            return res.redirect('/checkout')
        }
        req.flash('success',"Successfully bought")
        req.cart= null;
        res.redirect('/') 
    })
})
module.exports = router