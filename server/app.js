require('dotenv').config()

const express = require ('express')
const app = express()
const cors = require ('cors')
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const cronJob = require ('./helpers/deleteAnswers')

const mongoose = require ('mongoose')
mongoose.connect(process.env.MONGOOSE, {useNewUrlParser: true, useUnifiedTopology : true, useFindAndModify : false})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
   console.log(`Connected to mongo bosq!`);
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded ({extended: false}))

// =====================ROUTE===========================================
app.use('/', routes)
app.use('/', errorHandler)
// =====================================================================

cronJob.start()

app.listen(process.env.PORT, () => console.log(`connected to port ${process.env.PORT} with love and gawl!`))