const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const port = process.env.port
const router = require('./routes/authRoute')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.mongo_uri)
.then(() => {
    console.log('connected to mongodb')
})
.catch((error) => {
    console.log(`Mongodb error ${error}`)
})

app.use('/api', router)

app.listen(port, () => {
    console.log('Server started')
})