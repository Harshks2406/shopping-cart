const express = require('express');
const csrf = require('csurf')
const csrfProtection = csrf()
const router = express.Router()
const passport = require('passport')
const Order = require('../src/models/order')
const Cart = require('../src/models/cart');

router.use(csrfProtection)


router.get('/profile',isLoggedIn,(req,res)=>{
    console.log(req.user)
    Order.find({user: req.user},function(err,orders){
        if(err){
            return res.write('Errors!')
        }
        var cart;
        orders.forEach(function(order){
            cart = new Cart(order.cart)
            order.items = cart.generateArray()
        })
        res.render('profile',{orders: orders})
    })
})

router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout()
    res.redirect('/')
})

router.use('/',notLoggedIn,(req,res,next)=>{
    next();
})

router.get('/signup',(req,res)=>{
    var messages = req.flash('error')
    res.render('signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors : messages.length>0 })
})

router.post('/signup',passport.authenticate('local.signup',{
    failureRedirect: '/user/signup',
    failureFlash: true
}),function(req,res,next){
    if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl
        req.session.oldUrl = null
        res.redirect(oldUrl)
    }else{
        res.redirect('/user/profile')
    }
})

router.get('/signin',(req,res)=>{
    var messages = req.flash('error')
    res.render('signin',{csrfToken: req.csrfToken(), messages: messages, hasErrors : messages.length>0 })
})

router.post('/signin',passport.authenticate('local.signin',{
    failureRedirect: '/user/signin',
    failureFlash: true
}),function(req,res,next){
    if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl
        req.session.oldUrl = null
        res.redirect(oldUrl)
    }else{
        res.redirect('/user/profile')
    }
})

module.exports = router

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}

function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}