const express = require('express');
const csrf = require('csurf')
const csrfProtection = csrf()
const router = express.Router()
const passport = require('passport')

router.use(csrfProtection)


router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('profile')
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
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}))

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