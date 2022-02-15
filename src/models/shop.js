const mongoose = require("mongoose")
const validator = require("validator")

const productSchema = mongoose.Schema({
    imagePath: {
        type: String,
        required : true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
 
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product