const jwt = require('jsonwebtoken')
const JET_SECRET = 'samiul_bashar'

exports.fetchUser = async(req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(400).json({ error: 'something wrong' })
    }

    try {

        const data = jwt.verify(token, JET_SECRET)
        req.user = data.user
        next()

    } catch (e) {
        res.status(400).json({ error: 'something wrong' })
    }
}