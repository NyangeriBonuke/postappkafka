const AuthController = require('../controllers/authController')
const express = require('express')
const router = express.Router()

router.post('/signup', AuthController.userSignUp)
router.post('/login', AuthController.userLogin)

module.exports = router