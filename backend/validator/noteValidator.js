const { body } = require('express-validator')

module.exports = [
    body('title', 'title can not be empty').isLength({ min: 5 }),
    body('description', 'Description can not be empty').isLength({ min: 5 })
]