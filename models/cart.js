const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        default: null,
        required: true
    },
    products: [
        String
    ],
    clicks:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('cart', cartSchema)