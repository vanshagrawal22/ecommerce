// schema for server side validation
const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),  // product model schema k keys
    img: Joi.string().required(),
    price:Joi.string().min(0).required(),
    desc: Joi.string().required()
})

const reviewSchema = Joi.object({
    rating: Joi.string().min(0).max(5).required() ,
    comment: Joi.string().required()
})

module.exports = {productSchema , reviewSchema} // named export (becoz name se hi import hoga)