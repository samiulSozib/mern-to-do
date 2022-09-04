const mongoose = require('mongoose')
const mongoUrl = 'mongodb://localhost:27017/note-book'

const connectToMongo = () => {
    mongoose.connect(mongoUrl, () => {
        console.log('connect to mongodb database')
    })
}

module.exports = connectToMongo