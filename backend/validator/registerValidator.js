const { body } = require('express-validator')

module.exports = [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
]