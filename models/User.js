const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    addresses: {
        type: Array, 
        default: []
    },
    image: {
        type: String,
        default: '/images/userlogo.png'
    }
})

module.exports = mongoose.model('User', User)