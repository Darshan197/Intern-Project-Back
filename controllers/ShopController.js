const Shop = require('../models/Shop')
const Item = require('../models/Item')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Register = async (req, res) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 10)
        const sh = await Shop.create({...req.body, password: hash})
        const items = await Item.find({category: sh.type}).select('_id')
        const its = items.map(i => i._id)
        const shop = await Shop.findByIdAndUpdate(sh._id, {items: its}, { new: true })
        return res.status(201).json(shop)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const Login = async (req, res) => {
    try {
        const shop = await Shop.findOne({ phone: req.body.phone }).populate('items')
        if(shop) {
            const checkPassword = bcrypt.compareSync(req.body.password, shop.password)
            if(checkPassword) {
                const token = jwt.sign({ user: shop.owner }, 'lsa')
                return res.status(200).json({shop, token})
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

const AddItems = async (req, res) => {
    try {
        const sid = req.body.id
        const sh = await Shop.findById(sid)
        const items = await Item.find({category: sh.type}).select('_id')
        const its = items.map(i => i._id)
        const shop = await Shop.findByIdAndUpdate(sid, {items: its}, { new: true })
        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getShops = async (req, res) => {
    try {
        const category = req.query.category
        if(category === undefined) {
            const shops = await Shop.find().populate('items')
            return res.status(200).json(shops)
        }
        const shops = await Shop.find().populate('items').where('type', category)
        return res.status(200).json(shops)
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
        const shop = await Shop.findByIdAndUpdate(id, req.body, { new: true }).populate('items')
        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const sep = async (req, res) => {
    try {
        const items = await Item.find({ category: 'Vegetable/Fruit' })
        return res.status(200).json(items)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { Register, Login, AddItems, getShops, update, sep }