const { body } = require('express-validator')

module.exports = [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password can not be empty').exists()
]