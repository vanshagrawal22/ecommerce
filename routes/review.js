const express = require('express')
const router = express.Router()
const Review = require('../models/Review');
const Product = require('../models/Product');
const {validateReview} = require('../middleware')

router.post('/products/:id/review' , validateReview , async(req ,res)=>{
    try{
        let {id} = req.params;         // id to know kiss product pr review add kr rhe h 
        let {rating , comment } = req.body;   // destructure from req.body
    
        const  product = await Product.findById(id);   // product selected  (mongoose operation returns promise , await only work with async)
        // js fun
        const review = new Review({rating , comment});
        product.reviews.push(review);         // product k reviews k andr push kr dia humne jo review bnaya h
    
        // save in db  (mongoose ka method nhi bnaya h , toh save krna pdega db m)
        await review.save()
        await product.save()
    
        req.flash('success' , 'Review added successfully')   // key : value
        res.redirect(`/products/${id}`)
    }
    catch(e){
        res.status(500).render('error' , {err:e.message})
    }
})

module.exports = router;