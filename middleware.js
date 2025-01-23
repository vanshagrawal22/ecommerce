const Product = require('./models/Product');
const {productSchema , reviewSchema} = require('./schema')

const validateProduct = (req , res , next)=>{
    const {name , img , price , desc} = req.body;  
    const {error} = productSchema.validate({name,img,price,desc})
    if(error){
        return res.render('error')
    }
    next();
} 

const validateReview = (req , res , next)=>{
    const {rating , comment} = req.body;
    const {error} = reviewSchema.validate({rating , comment })
    if(error){
        // new
        const msg = error.details.map((err)=>err.message).join(',');
        return res.render('error' , {err:msg});
    }
    next();
}


const isLoggedIn = (req , res ,next)=>{
    // console.log(req.originalUrl);
    // console.log(req.xhr);
    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).json({msg:'you need to login first'});
    }
    
    if(!req.isAuthenticated()){   // jisne request ki h kya vo authenticate h ya nhi
        req.flash('error', 'please login first')
        // next nhhi kra kyuki aage move nhi kr skta logged in nhi h 
        return res.redirect('/login')
    }
    next();
}

const isSeller = (req , res , next) =>{
    if(!req.user.role){
        req.flash('error', "you dont have the permission to do that");
        return res.redirect('/products')
    }
    else if(req.user.role !== 'seller'){
        req.flash('error', "you dont have the permission to do that");
        return res.redirect('/products')
    }
    next();
}

const isProductAuthor = async(req , res , next) =>{
    let {id} = req.params; // product id
    const product = await Product.findById(id);
    // new
    console.log(product.author);
    console.log(req.user);
    // ----
    if(!product.author.equals(req.user._id)){
        req.flash('error' , "you dont have the permission to do that")
        return res.redirect('/products')
    }
    next();
}
module.exports = {isLoggedIn , validateReview , validateProduct , isSeller , isProductAuthor};  //named export