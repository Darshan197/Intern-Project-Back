const mongoose = require('mongoose')

const Order = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
    items: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    modeOfDelivery: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('Order', Order)