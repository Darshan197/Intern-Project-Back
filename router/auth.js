const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const fs = require('fs')

router.post('/login', AuthController.Login)
router.post('/register', AuthController.Register)

const bodyParser = require('body-parser')
var rawParser = bodyParser.raw({
    type: 'application/octet-stream', extended: true
});
router.post('/uploadimage', rawParser, (req, res) => {
    const name = (new Date).getTime() + ".png"
    fs.writeFileSync('images/'+name, req.body)
    return res.status(201).json('/images/' + name)
})

module.exports = router