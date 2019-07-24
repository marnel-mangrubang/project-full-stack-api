const router = require('express').Router()
const Units = require('../models/units')
const mongoose = require('mongoose')

// const Companies = require('../models/companies')

//GET - /api/v1/companies
router.get('/', (req, res, next) => {

  const { name, employees_lte, employees_gte } = req.query

  Units.find()
  .then((units) => {

    const status = 200
    const message = `Successfully retrieved all company information.`
    const path = '/api/v1/companies'

    let findby = {};

    // GET - /api/v1/companies?name=[partial-query] - DONE
    if(name){
      const myunit = units.map((unit) => {
        return unit.company.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
      })
      return res.json({status, message, companies: myunit})
    }


    // GET - /api/v1/companies?employees_lte=[integer]  - DONE
    if(employees_lte){
      const myunit = units.map((unit) => {
        return unit.company.filter((comp) => comp.employees.length <= employees_lte)
      })
      return res.json({status, message, companies: myunit})
    }


    // GET - /api/v1/companies?employees_gte=[integer]  - DONE
    if(employees_gte){
      const myunit = units.map((unit) => {
        return unit.company.filter((comp) => comp.employees.length >= employees_gte)
      })
      return res.json({status, message, companies: myunit})
    }



    res.json({status, message, companies: units})
  })
  .catch((error) => {
    console.error(error)
    const e = new Error('Something went wrong with retrieving company information.')
    e.status = 400
    next(e)
  })

})



module.exports = router
