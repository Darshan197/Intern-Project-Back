const mongoose = require('mongoose')

const Shop = new mongoose.Schema({
    name: { type: String, required: true },
    owner: new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
    }),
    verified: { type: Boolean, default: false },
    rating: { type: Number, default: 1.0 },
    email: { type: String },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    workingdays: { type: String, required: true },
    timings: { type: String, required: true },
    license: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    items: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: [] } ],
    image: { type: String, default: '/images/store.png' }
})

module.exports = mongoose.model('Shop', Shop)