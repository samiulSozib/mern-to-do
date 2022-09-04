const authRoute = require('./auth')
const noteRoute = require('./notes')

const routes = [{
        path: '/api/auth',
        handler: authRoute
    },
    {
        path: '/api/notes',
        handler: noteRoute
    },
    {
        path: '/',
        handler: (req, res) => {
            return res.json({ msg: 'welcome to my application' })
        }
    }
]

module.exports = (app) => {
    routes.forEach(r => {
        if (r.path == '/') {
            app.get(r.path, r.handler)
        } else {
            app.use(r.path, r.handler)
        }
    })
}