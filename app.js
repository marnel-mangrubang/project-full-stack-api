const { MONGO_DB, PORT, NODE_ENV } = process.env
const express = require('express')
const morgan = require('morgan')

const mongoose = require('mongoose')
const app = express()
//body-parser
//morgan

if(MONGO_DB){
  const options = {useFindAndModify: false, useNewUrlParser: true}
  mongoose.connect(MONGO_DB, options);
  console.log("Connected to the DB")
}else{
  console.log("MONGO_DB is not provided")
}


if(NODE_ENV === 'development') app.use(morgan('dev'))
app.use(require('body-parser').json())

app.use('/api/v1/units', require('./api/routes/units'))

app.use('/api/v1/companies', require('./api/routes/companies'))

app.use('/api/v1/employees', require('./api/routes/employees'))


// Not Found Handler
app.use((req, res, next) => {
  const error = new Error(`Could not ${req.method} ${req.path}`)
  error.status = 404
  next(error)
})

// Error Handler
app.use((err, req, res, next) => {
  console.err(err)
  const status = err.status || 500
  const message = err.message || "Something went wrong"
  res.json({status, message})
})

const  listener = () => console.log(`Listening in port ${PORT}`)
app.listen(PORT, listener)
