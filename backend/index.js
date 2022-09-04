const cors = require('cors')
const connectToMongo = require('./db')
const express = require('express')
const setRoutes = require('./routes/routes')
const setMiddleware = require('./middleware/middleware')

connectToMongo()

const app = express()
app.use(cors())
setMiddleware(app)
setRoutes(app)


app.listen(1000, () => {
    console.log('server created success')
})