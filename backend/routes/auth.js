const router = require('express').Router()
const { createUser, logInUser, getUser } = require('../controller/authController')
const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const { fetchUser } = require('../middleware/fetchUser')

router.post('/register', registerValidator, createUser)
router.post('/login', loginValidator, logInUser)
router.post('/get-user', fetchUser, getUser)

module.exports = router