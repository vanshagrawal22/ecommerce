const express = require('express');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router()
const nodemailer = require('nodemailer')

// to show the form of signup
router.get('/register' , (req , res)=>{
    res.render('auth/signup');
})

// actually want to register the user in my DB
router.post('/register' , async(req , res)=>{
    let {email , password , username , role} = req.body;   
    const user = new User({email , username , role})
    // static method
    const newUser = await User.register(user , password);   //register work with db hence wait
    // res.send(newUser);
    // res.redirect('/login')

    req.login(newUser , function(err){
        if(err){
            return next(err);
        }
        req.flash('success' , 'welcome')
        return res.redirect('/products')
    })




    const sendmail = async ()=>{
        const transporter = nodemailer.createTransport(
            {
                service:'gmail',
                auth:{
                    // user:'agrawalvansh4@gmail.com',
                    // pass:'jwcmvyvwfbtqhcyeoyeoye' // oyeoye
                }
            }
        )
       
        // mail config
        const mailOptions = {
            from:'agrawalvansh4@gmail.com',
            to:email, 
            subject:'Welcome to nodejs app',
            text:`click here to login`,
        }
    
        // send e-mail
        try {
            await transporter.sendMail(mailOptions)
            console.log('email sent successfully')
        } catch (error) {
            console.log(error);
            
        }
    
    }
    sendmail();
    
})
// to get login form
router.get('/login' , (req , res)=>{
    res.render('auth/login')
})

// to actually login via the db
router.post('/login' , 
    passport.authenticate('local',      // local strategy use kr rhe h
        { 
            failureRedirect: '/login', 
            failureMessage: true 
        }
    ),
    (req ,res)=>{
        // console.log(req.user);
        req.flash('success' , 'welcome back')
        res.redirect('/products')
})

// logout
router.get('/logout' , (req , res)=>{
    ()=>{
        req.logout();       // works inside a callback function always
    }
    req.flash('success' , 'good bye friends , see u again')
    res.redirect('/login')
})





module.exports = router;