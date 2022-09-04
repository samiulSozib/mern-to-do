const Users = require('../models/Users')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JET_SECRET = 'samiul_bashar'

exports.createUser = async(req, res, next) => {

    try {
        let { name, email, password } = req.body

        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        let user = await Users.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: 'User Already exists' })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(password, salt)

        let createdUser = await Users.create({
            name,
            email,
            password: secPass
        })

        const data = {
            user: {
                id: createdUser.id
            }
        }
        const authToken = jwt.sign(data, JET_SECRET)
        res.json({ authToken })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'user create fail', msg: e.message })
    }

}

// login user

exports.logInUser = async(req, res, next) => {
    try {

        let { email, password } = req.body
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const user = await Users.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: 'Please Provide Correct Credentials' })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: 'Please Provide Correct Credentials' })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JET_SECRET)
        res.json({ authToken })


    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'Login fail', msg: e.message })
    }
}

// get user 
exports.getUser = async(req, res, next) => {
    try {
        let userId = req.user.id
        console.log(userId)
        const user = await Users.findById(userId).select('-password')
        res.send(user)
    } catch (e) {
        return res.status(500).json({ error: 'Login fail', msg: e.message })
    }
}