// capital letter file : for model(convention)
const mongoose = require("mongoose");
const Review = require('./Review')

const productSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            trim:true,             //if  extra spaces remove krdenge
            required:true
        },
        img: {
            type: String,
            trim: true,
            // default
        },
        price: {
            type: Number,
            min:0,                 // negative value nhi denge
            required:true
        },
        desc: {
            type: String,
            trim: true
        },
        avgRating:{
            type:Number,
            default:0
        },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        reviews:[
            {
                // product k review m id store krdenge review ki , jo bhi review ki id hogi usi id ko store krdenge
                type: mongoose.Schema.Types.ObjectId  ,  //(dusre schema ki object id h ) storing the object id of reviews (hum data nhi id store kr rhe h )
                ref:'Review'   // model konsa(jo object id leni h , vo Review k model se leni h)
            }
        ]
    }
)

// middleware jo BTS mongodb operation krwane pr use hota h 
// and iske andr pre nd post middleware hote hai which are basically used 
// over the schema and before the model is js class

productSchema.post('findOneAndDelete' , async function(product) {
    if(product.reviews.length > 0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})
const Product = mongoose.model('Product' , productSchema)
module.exports = Product; 