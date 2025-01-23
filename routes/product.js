const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { validateProduct , isLoggedIn  , isSeller ,isProductAuthor} = require('../middleware');
const {showAllProducts, productForm , createProduct , showProduct , editProductForm , updateProduct , deleteProduct} =  require('../controllers/product')

router.get('/products', showAllProducts );

router.get('/showBook/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the route
        const product = await Product.findById(id); // Retrieve the movie from the database
        const price = product.price;
        // console.log(product)

        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Render the ticketBooked template with the required data
        res.render('products/booked', {
            productId: product._id,
            name: product.name,
            price, // Assuming your Movie model has a price field
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.get('/products/new', isLoggedIn, isSeller, productForm);

router.post('/products', isLoggedIn, isSeller, validateProduct, createProduct);

router.get('/products/:id', isLoggedIn, showProduct);

router.get('/products/:id/edit',isLoggedIn,isProductAuthor, editProductForm);

router.patch('/products/:id', isLoggedIn, isProductAuthor, validateProduct, updateProduct);


router.delete('/products/:id',isLoggedIn,isProductAuthor,deleteProduct);


module.exports = router;