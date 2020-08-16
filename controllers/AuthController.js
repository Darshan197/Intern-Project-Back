const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Shop = require('../models/Shop')

const Login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(user) {
            const checkPassword = bcrypt.compareSync(req.body.password, user.password)
            if(checkPassword) {
                const token = jwt.sign({ user }, 'lsa')
                delete user.password
                return res.status(200).json({user, token})
            } else {
                return res.status(401).json({message: 'Credential Mismatched'})
            }
        } else {
            return res.status(401).json({message: 'Invalid Credentials'})
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const Register = async (req, res) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hash
        const user = await User.create(req.body)
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { Login, Register }