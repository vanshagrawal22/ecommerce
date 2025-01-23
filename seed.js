// initial data(dummy data)
const mongoose = require('mongoose');

const Product = require('./models/Product')

const products = [
    {
        name: "Iphone 14pro",
        img:"https://images.unsplash.com/photo-1705305835960-3271b7e9ae9c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lJTIwMTQlMjBwcm98ZW58MHx8MHx8fDA%3D",
        price:130000,
        desc:"veery costly , aukaat k bahar"
    },
    {
        name: "Macbook m2 pro",
        img:"https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 250000,
        desc: "ye toh bilkul aukaat k bahar"
    },
    {
        name:"iwatch",
        img:"https://images.unsplash.com/photo-1705305835960-3271b7e9ae9c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lJTIwMTQlMjBwcm98ZW58MHx8MHx8fDA%3D",
        price:51000,
        desc:"ye sasta hai lelo"
    },
    {
        name:"ipad pro",
        img:"https://images.unsplash.com/photo-1705305835960-3271b7e9ae9c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lJTIwMTQlMjBwcm98ZW58MHx8MHx8fDA%3D",
        price:237900,
        desc:"life mein kuch cheese sirf dhekne k liye hota h"
    },
    {
        name:"earpods",
        img:"https://images.unsplash.com/photo-1607452263110-39a87c399c50?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBhZCUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
        price:15100,
        desc:"bhaut jarurat h bhai"
    }
]


// insert in db
// all db methods returns promise
// to rescue from promise chaining we do asyn await
async function seedDb(){
    await Product.insertMany(products); // wait for task to be done
    console.log("data seeded successfully")
}

module.exports = seedDb;