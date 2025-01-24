require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const nodemailer = require('nodemailer');

const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');

const mongoose = require('mongoose');

const seedDb = require('./seed')
const methodOverride = require('method-override');

const flash = require('connect-flash')

const productApi = require('./routes/api/productapi')
const session = require('express-session')

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User')

const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')
const checkRoutes = require('./routes/checkout')

mongoose.connect(process.env.MONGODB)
.then(()=>{
    console.log("DB connected Successfully");
    
})
.catch((err)=>{
    console.log("DB ERROR!!");
    console.log(err)
})


// session
let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 24*7*60*60*1000,
        maxAge: 24*7*60*60*1000
    }
}

app.engine('ejs' , ejsMate);    // setting the engine (ejs ki file dhekni h toh vo konsa engine dhekega)
app.set('view engine' , 'ejs');  // engine ka kaam kya h (sirf ejs ki file dhekega)
app.set('views' , path.join(__dirname , 'views')); // templates ka address
app.use(express.static(path.join(__dirname , 'public')));// public folder

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method')); // access by _method

app.use(session(configSession))
app.use(flash()) 


// passport vaali
app.use(passport.initialize());  // to use the property of passport  initialize passport
app.use(passport.session())  // to store data in server  initialize sessiion
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req , res , next)=>{
    res.locals.currentUser = req.user; // khi se bhi access kr paye isisliye local environmet m save kr dia
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})  


// PASSPORT 
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));  // local strategy ka use kr rha h ye bhi bta dia

// seeding database
// seedDb();  // run only at once  
app.get('/' , (req , res)=>{
    res.render('home');
})

app.use(productRoutes); // so that harr  incoming request k liye path check kia jaye
app.use(reviewRoutes);  // so that harr  incoming request k liye path check kia jaye
app.use(authRoutes)     // so that harr  incoming request k liye path check kia jaye
app.use(cartRoutes)
app.use(productApi)
app.use(checkRoutes)





app.listen(8080 , ()=>{
    console.log("Port started at port no : 8080");
})
