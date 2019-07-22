const mongoose = require('mongoose')

const employee = new mongoose.Schema({
  first_name: {type:String, required: true},
  last_name: {type:String, required: true},
  preferred_name: {type:String},
  position: {type:String},
  birthday: {type:Date},
  email: {type:String, required: true},
})

module.exports = employee
