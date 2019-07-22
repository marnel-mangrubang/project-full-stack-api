const mongoose = require('mongoose')
const employee = require('./employees')

const company = new mongoose.Schema({
  name: {type:String, required: true},
  contact_email: {type:String, required: true},
  employees: [employee],
})

module.exports = company
