const express = require('express')
const router = express.Router()
const UserController = require("../controllers/UserController")
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const bearer = req.headers['authorization']
    if(bearer !== undefined) {
        const token = bearer.split(' ')[1]
        jwt.verify(token, 'lsa', (err, data) => {
            if(err) return res.sendStatus(403)
            next()
        })
    } else {
        return res.sendStatus(403)
    }
}

router.put('/:id', verifyToken, UserController.update)
router.post('/addaddress/:id', UserController.addAddress)

module.exports = router