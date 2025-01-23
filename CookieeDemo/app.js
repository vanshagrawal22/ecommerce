const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser('youneedabettersecret'))

app.get('/' , (req , res)=>{
    // signed cookies show nhi hogi
    console.log(req.cookies);
    // res.send(req.cookies);
    res.send(req.signedCookies) // all signed cookies
    
    // res.send('root connected')
})

// signed cookie  
app.get('/getsignedcookies' , (req ,res)=>{
    res.cookie('bindaas' , 'sachin' , {signed:true})   // signed true for sequired
    res.send('cookie send successfully')
})

// app.get('/setcookie' , (req , res)=>{
//     // server n bheji h , means (res)
//     res.cookie('mode' , 'dark');  //cookie singular
//     res.cookie('location' , 'delhi')
//     res.cookie('username' , 'samvan')
//     res.send('server sent you cookies');
// })

// app.get('/getcookies' , (req , res)=>{
//     // store hui h client pr ie (req)
//     let {mode , location , username } = req.cookies; //plural
//     res.send(`hi my name is ${username} , i stay in ${location} , and my fav theme is ${mode}`);
// })
app.listen(8080 , ()=>{
    console.log("server started");
    
})