const mongoose = require('mongoose')

const Category = new mongoose.Schema({
    name: { type: String }
})

module.exports = mongoose.model('Category', Category)