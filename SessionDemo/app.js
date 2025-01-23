const express = require('express')
const app = express()
const session = require('express-session')

app.use(session({       //session same as above
    secret: 'keyboard cat',   // secret key anything
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

app.get('/' , (req , res)=>{
    res.send('Session m swagat h aapka')
})

app.get('/viewcount' , (req , res)=>{
    if(req.session.count){
        req.session.count+=1;
    }else{
        req.session.count=1;
    }

    res.send(`you have visited the site ${req.session.count} times`)
})

app.get('/setname' , (req , res)=>{
    req.session.username = 'vansh agrawal'
    res.redirect('/greet');
})

app.get('/greet' , (req , res)=>{
    let{username = "anonymous"} = req.session;   // if username not present then anonymous is stored
    res.send(`hello from ${username}`)
})
app.listen(8080 , ()=>{
    console.log('server is running on port 8080')
})