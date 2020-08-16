const express = require('express')
const router = express.Router()
const ShopController = require('../controllers/ShopController')

const verifyToken = (req, res, next) => {
    const bearer = req.headers['Authorization']
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

router.post('/register', ShopController.Register)
router.post('/login', ShopController.Login)
router.post('/additems', ShopController.AddItems)
router.get('/get', ShopController.getShops)
router.put('/:id', ShopController.update)
router.get('/sep', ShopController.sep)


module.exports = router