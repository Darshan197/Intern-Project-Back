const User = require("../models/User")
const bcrypt = require('bcrypt')

const addAddress = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        const addresses = user.addresses
        addresses.push(req.body.address)
        user.addresses = addresses
        const nuser = await User.findByIdAndUpdate(id, user, { new: true })
        return res.status(201).json(nuser)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id
        if(req.body.password !== '') {
            const hash = bcrypt.hashSync(req.body.password, 10)
            req.body.password = hash
        } else {
            delete req.body.password
        }
        const user = await User.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}


module.exports = { addAddress, update }