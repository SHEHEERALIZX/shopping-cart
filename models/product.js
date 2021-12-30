const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({


    name: {
        type: String,
        default:null

        },

    image:{
        type:String,
        default:null
    },

    description: {
        type: String,
        default:null

    }
})

module.exports = mongoose.model('product',productSchema)