const express = require('express')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

app.use(express.json())
require('./config/Database')

const Order = require('./models/Order')
io.on('connection', (socket) => {
    sendStatus = (s) => {
        socket.emit('status', s)
    }
    app.post('/placeOrder', (req, res) => {
        Order.create({...req.body, status: 'pending'})
        .then((data) => {
            Order.findById(data._id).populate({ path: 'customer', select: ['name', 'phone'] })
            .then((order) => {
                io.emit(`newOrder/${order.shop}`, order)
            })
            Order.findById(data._id).populate({path: 'shop', select: ['name', 'phone']})
            .then((order) => {
                return res.status(201).json(order)
            })
        })
    })
    socket.on('placeOrder', (data) => {
        Order.create({...data, status: 'pending'})
        .then((res) => {
            Order.findById(res._id).populate({ path: 'customer', select: ['name', 'phone'] })
            .then((order) => {
                io.emit(`newOrder/${order.shop}`, order)
            })
            Order.findById(res._id).populate({path: 'shop', select: ['name', 'phone']})
            .then((order) => {
                io.emit(`newOrder/${order.customer._id}`, order)
            })
        })
    })
    socket.on('orderUpdate', (data) => {
        Order.findByIdAndUpdate(data._id, data, { new: true })
        .then((res) => {
            Order.findById(res._id).populate({ path: 'customer', select: ['name', 'phone'] })
            .then((order) => {
                io.emit(`orderUpdate/${order._id}`, order)
            })
        })
    })
})

const Auth = require('./router/auth')
app.use('/', Auth)

const Shop = require('./router/shop')
app.use('/shop', Shop)

const User = require("./router/user")
app.use('/user', User)

const order = require('./router/order')
app.use('/order', order)

app.use('/images', express.static('images'))
const PORT = process.env.PORT
server.listen(PORT, () => console.log(`Server is started On PORT ${PORT}`))