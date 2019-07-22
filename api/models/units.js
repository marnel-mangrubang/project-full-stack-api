const mongoose = require('mongoose')
const company = require('./companies')

/*
{
  "kind":"desk",
  "floor":3,
  "special_monthly_offer":4000,
  "company":[
    {
      "name":"Alaska Airlines",
      "contact_email":"alaska@alaska.com",
      "employees": [
          {
              "first_name":"Marnel",
              "last_name":"Mangrubang",
              "preferred_name":"Mar",
              "position":"Front-End Engineer",
              "birthday":"1988-12-08",
              "email":"delrosam@gmail.com"
          }
      ]
    }
  ]
}

*/


const unitSchema = new mongoose.Schema({
  kind: {type: String, required: true},
  floor: {type: Number, required: true},
  special_monthly_offer: {type: Number},
  company: [company]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model("Units", unitSchema)
