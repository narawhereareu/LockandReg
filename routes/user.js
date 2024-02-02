const express = require('express')
const router = express.Router()

//impoirt controller

const {test,login,register,getusers,deleteId} = require('../controller/user.js')

const { authenticateToken } = require('../middleware/token')

//login
router.get('/',test)
router.post('/login',login)
router.post('/register',register)

router.get('/profile/:id',authenticateToken,getusers)

router.delete('/user/:id',deleteId)
module.exports = router