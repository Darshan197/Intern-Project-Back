const Order = require('../models/Order')

exports.CreateOrder = async (req, res) => {
    try {
        const order = await Order.create({...req.body, status: 'pending'})
        return res.status(201).json(order)
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error')
    }
}

exports.getOrders = async (req, res) => {
    try {
        const shopId = req.query.shopId
        const status = req.query.status
        const customerId = req.query.customerId
        if(shopId) {
            if(status === 'pending') {
                const orders = await Order.find({ shop: shopId, status: ['pending', 'outfordelivery', 'accepted', 'packed'] }).populate({ path: 'customer', select: ['name', 'phone'] })
                return res.status(200).json(orders)
            } else {
                const orders = await Order.find({ shop: shopId }).populate({ path: 'customer', select: ['name', 'phone'] })
                return res.status(200).json(orders)
            }
        } else if(customerId) {
            const orders = await Order.find({ customer: customerId }).populate({path: 'shop', select: ['name', 'phone', 'image']})
            return res.status(200).json(orders)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error')
    }
}

exports.getOrder = async (req, res) => {
    try {
        const id = req.params.id
        const order = await Order.findById(id).populate({ path: 'customer', select: ['name', 'phone'] })
        return res.status(201).json(order)
    } catch (error) {
        return res.status(500).json('Server Error')
    }
}