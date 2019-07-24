const router = require('express').Router()
const Units = require('../models/units')
const mongoose = require('mongoose')
const moment = require('moment');



//GET - /api/v1/employees?name=[partial-query]
router.get('/', (req, res, next) => {

  const { name, birthday } = req.query

  Units.find()
  .then((units) => {

    const status = 200
    const message = `Successfully retrieved all employee information.`
    const path = '/api/v1/employees'

    let findby = {};

    // GET - /api/v1/employees?name=[partial-query] - DONE
    if(name){
      console.log(name)

      const myemployee = units.map((unit) => {
        return unit.company.map((comp) => {
          return comp.employees.filter((item) => item.first_name.toLowerCase().includes(name.toLowerCase()) || item.last_name.toLowerCase().includes(name.toLowerCase()) || item.preferred_name.toLowerCase().includes(name.toLowerCase()))
        })
      })

      return res.json({status, message, employees: myemployee})

    }


    // GET - /api/v1/employees?birthday=[date]
    //NOTE: Birthday query parameter value needs to be in this format yyyy-mm-dd

    //1990-05-28T00:00:00.000Z
    //September 15th 2008, 12:00:00 am
    if(birthday){
      console.log(birthday)

      // const formattedbday = moment(birthday).toISOString()
      // const formattedbdayagain = moment(formattedbday).format('YYYY-MM-DD')
      // console.log(formattedbdayagain)
      // const birthdayparam = formatDate()

      const myemployee = units.map((unit) => {
        return unit.company.map((comp) => {
          return comp.employees.filter((item) => moment(item.birthday).format('YYYY-MM-DD') == birthday)
        })
      })
      return res.json({status, message, myemployee})
    }

    res.json({status, message, units})
  })
  .catch((error) => {
    console.error(error)
    const e = new Error('Something went wrong with retrieving employee information.')
    e.status = 400
    next(e)
  })

})



module.exports = router
