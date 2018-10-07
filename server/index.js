const express = require('express')
const path = require('path')
const sequelize = require('sequelize')
const { School, Student, seed, test} = require('./db/index.js')

const PORT = process.env.PORT || 3000
const app = express()

// body-parsing middleware
app.use(express.json())

//static file-serving middle-ware
app.use('/dist', express.static(path.join(__dirname, '../dist')))

//main GET route
app.get('/', (req,res,next) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})

//api routes
app.use('/api/schools', require('./api/schools.js'))
app.use('/api/students', require('./api/students.js'))

//error catching middleware
app.use ((err, req, res,next) => {
    console.log(err, typeof next)
    console.error(err.stack)
    res.status(err.status || 500).send (err.message || 'Internal server error.')
})

// initialize server

const init = () => {
    seed()
    app.listen(PORT, ()=> {`app is listening on ${PORT}`})
}

init()