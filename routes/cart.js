const express = require('express');
const { isLoggedIn } = require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User');
const router = express.Router()


// route to see the cart
router.get('/user/cart' , isLoggedIn , async(req , res)=>{
    const user = await User.findById(req.user._id).populate('cart');
    const totalAmount = user.cart.reduce((sum , curr)=> sum+curr.price , 0)
    const productInfo = user.cart.map((p)=>p.desc).join(',');
    res.render('cart/cart' , {user, totalAmount , productInfo });
})

// actually adding product to the cart
router.post('/user/:productId/add' , isLoggedIn , async(req ,res)=>{
    let {productId} = req.params
    let userId = req.user._id;

    let product = await Product.findById(productId)
    let user = await User.findById(userId)
    user.cart.push(product)
    await user.save();
    res.redirect('/user/cart');
})

router.post('/remove/:id', async(req ,res)=>{
    let {id} = req.params;
    let product = await Product.findById(id);
    let user = await User.findById(req.user._id);


    const productIndex = user.cart.findIndex(item => item._id.toString() === product._id.toString()); 
    if (productIndex > -1) { 
        // Remove only the first matched product 
        user.cart.splice(productIndex, 1);
    }
    // // Use filter to remove the product from the cart
    // user.cart = user.cart.filter(item => item._id.toString() !== product._id.toString());
    await user.save();
    res.redirect('/user/cart')

})


module.exports = router;