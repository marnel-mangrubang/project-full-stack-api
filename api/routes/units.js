const router = require('express').Router()
const Units = require('../models/units')
const mongoose = require('mongoose');

//GET - /api/v1/units   - DONE
//GET - /api/v1/units?kind=[kind]   - DONE
//GET - /api/v1/units?floor=[integer]   - DONE
router.get('/', (req, res, next) => {

    const { kind, floor, occupied } = req.query

    let findby = {};

    if(kind){
      findby = {kind: kind}

      Units.find(findby)
      .then((units) => {
        const status = 201
        const message = `Successfully retrieved all units matching {kind:${kind}} query.`
        const path = '/api/v1/units?occupied=true'

        res.json({status, message, path, units})
      })
      .catch((error) => {
        console.error(error)
        const e = new Error('Something went wrong with the request')
        e.status = 400
        next(e)
      })
    }


    if(floor){
      findby = {floor: floor}
      Units.find(findby)
      .then((units) => {
        const status = 201
        const message = `Successfully retrieved all units matching {floor:${floor}} query.`
        const path = '/api/v1/units?occupied=true'

        res.json({status, message, path, units})
      })
      .catch((error) => {
        console.error(error)
        const e = new Error('Something went wrong with the request')
        e.status = 400
        next(e)
      })
    }


    //GET - /api/v1/units?occupied=[true/false]  - DONE
    if(occupied === "true"){
        console.log(occupied)

        Units.find()
        .then((unit) => {
          // console.log(unit)
          const status = 201
          const message = `Successfully retrieved occupied units.`
          const path = '/api/v1/units?occupied=true'

          const occupied_units = unit.filter((comp) => {
            return comp.company.length >= 1;
          })

          const units = occupied_units;

          res.json({status: status, message, path: path, units})
        })
        .catch((error) => {
          console.error(error)
          const e = new Error('Something went wrong with RETRIEVING occupied units.')
          e.status = 400
          next(e)
        })

    }else if(occupied === "false"){

        Units.find()
        .then((unit) => {
          // console.log(unit)
          const status = 201
          const message = `Successfully retrieved available/un-occupied units.`
          const path = '/api/v1/units?occupied=false'

          const available_units = unit.filter((comp) => {
            return comp.company.length < 1;
          })

          const units = available_units;

          res.json({status: status, message, path: path, units})
        })
        .catch((error) => {
          console.error(error)
          const e = new Error('Something went wrong with RETRIEVING available units.')
          e.status = 400
          next(e)
        })

    }else{
        Units.find()
        .then((response) => {
          const status = 200
          res.json({status, response})
        })
        .catch((error) => {
          console.error(error)
          const e = new Error('Something went wrong with the request')
          e.status = 400
          next(e)
        })
    }



})






//POST - /api/v1/units - DONE
router.post('/', (req, res, next) => {

  Units.create({...req.body})
  .then((unit) => {
    console.log(unit)
    const status = 201
    const message = `Successfully added a new unit.`
    const path = '/api/v1/units'
    res.json({status: status, message, path: path,  unit})
  })
  .catch((error) => {
    console.error(error)
    const e = new Error('Something went wrong with POSTING a new unit.')
    e.status = 400
    next(e)
  })

})








//PATCH - /api/v1/units/[id]
router.patch('/:id', (req, res, next) => {

  // This one works but I wanna try using the $ operator
  // Units.findById(req.params.id)
  // .then((unit) => {
  //   const status = 200
  //   const path = '/api/v1/units/:id'
  //   unit.set(req.body);
  //   unit.save()
  //   res.json({status: status, path: path,  unit})
  // })
  // .catch((error) => {
  //   console.error(error)
  //   const e = new Error('Something went wrong with the PATCH')
  //   e.status = 400
  //   next(e)
  // })

  Units.findOneAndUpdate({_id:req.params.id}, {$set: {...req.body}}, {new:true})
  .then((unit) => {
    const status = 200
    const message = `Successfully updated unit ${unit._id}`
    const path = '/api/v1/units/:id'
    res.json({status: status, message, path: path,  unit})
  })
  .catch((error) => {
    console.error(error)
    const e = new Error('Something went wrong with PATCHING the unit info.')
    e.status = 400
    next(e)
  })

})



//PATCH - /api/v1/units/[id]/company   - DONE
router.patch('/:id/company', (req, res, next) => {

  // Units.findById(req.params.id)
  Units.findOneAndUpdate({_id:req.params.id}, {$set: {company: {...req.body}}}, {new:true})//Promise
  .then((unit) => {
    const status = 200
    const message = `Successfully updated company for unit ${unit._id}`
    const path = '/api/v1/units/:id/company'
    res.json({status: status, message, path: path,  unit})
  })
  .catch((error) => {
    console.error(error)
    const e = new Error('Something went wrong with PATCHING the unit company info.')
    e.status = 400
    next(e)
  })

})


//DELETE - /api/v1/units/[id]/company - DONE
router.delete('/:id/company', (req, res, next) => {

  const par = req.params.id

  Units.findOne({_id:req.params.id}) //Promise
  .then(unit => {
    const status = 200
    //Adding this so that i know which route that is being reach per request I make in postman
    const path = '/:id/company'

    //Loop through the company array and pull out the company id
    const companyID = unit.company.map((comp) => {
      return comp._id
    })

    const message = `Successfully removed company ${companyID} from the unit ${par}.`

    //pull out the object from the company array passing in the company ID
    unit.company.pull(companyID)
    //Save parent
    unit.save()

    res.json({status, message, path, unit: unit}) //Full JSON Response
  })
  .catch(error => {
    //Error Handling
    console.error(error)
    const e = new Error('Somethings went wrong with the DELETION of a company')
    e.status = 400
    next(e)
  })

})


//GET - /api/v1/units/[id]/company/employees  - DONE
router.get('/:id/company/employees', (req, res, next) => {

  const par = req.params.id

  Units.findOne({_id: req.params.id}) //Promise
  .then((unit) => {
    const status = 200
    //Adding this so that i know which route that is being reach per request I make in postman
    const path = '/:id/company/employees'
    const message = `Successfully retrieved employees occupying unit ${par}`

    //Loop through the company array and return all employees
    const employees = unit.company.map((emp) => {
        return emp.employees
    })

    res.json({status, message, path, employees})
  })
  .catch((error) => {
    //Error handling
    console.error(error)
    const e = new Error('Somethings went wrong with RETRIEVING employees')
    e.status = 400
    next(e)
  })

})


//GET - /api/v1/units/[id]/company/employees/[id]  - DONE
router.get('/:id/company/employees/:employeeId', (req, res, next) => {

  const par = req.params.id

  Units.findOne({_id: req.params.id}) //Promise
  .then((unit) => {
    const status = 200
    //Adding this so that i know which route that is being reach per request I make in postman
    const path = '/:id/company/employees:employeeId'
    const message = `Successfully retrieved employees occupying unit ${par}`

    //Loop through the company array and return all employees
    // const employees = unit.company.find((emp) => emp.employees._id === req.params.employeeId)

    const employees = unit.company.map((comp)=> {
        return comp.employees.find(({ _id }) => req.params.employeeId == _id)
    })

    console.log(employees)

    res.json({status, message, path, employees})
  })
  .catch((error) => {
    //Error handling
    console.error(error)
    const e = new Error('Somethings went wrong with RETRIEVING a certain employee')
    e.status = 400
    next(e)
  })

})



//POST - /api/v1/units/[id]/company/employees - DONE
router.post('/:id/company/employees', (req, res, next) => {

  Units.findOne({_id:req.params.id}) //Promise
  // Units.create({...req.body})
  .then((unit) => {

    const status = 201
    const message = `Successfully added a new employee under unit.`
    const path = '/api/v1/units/:id/company/employees'

    //Loop through the company array and search for employees. Then push the req.body into the employees array.
    unit.company.map((comp) => {
      comp.employees.push({...req.body});
    })

    //Save parent document
    unit.save()

    res.json({status: status, message, path: path,  unit})
  })
  .catch((error) => {
    console.error(error)
    const e = new Error('Something went wrong with POSTING a new employee.')
    e.status = 400
    next(e)
  })

})

//PATCH - /api/v1/units/[id]/company/employees/[id]  - DONE
router.patch('/:id/company/employees/:employeeId', (req, res, next) => {
  const par = req.params.id

  Units.findOne({_id: req.params.id}) //Promise
  .then((unit) => {
    const status = 200
    const message = `Successfully updated employee ${par}.`
    const path = '/:id/company/employees/:id'

    //Loop through each company and find the employee that match the employeeId params
    //Once you find it, update it with the values of req.body
    const employee = unit.company.map((comp) => {
      return comp.employees.find(({ _id }) => req.params.employeeId == _id).set({...req.body})
    })

    //Save parent document
    unit.save()

    res.json({status: status, message, path: path,  unit})

  })
  .catch((error) => {
    console.error(error)
    const e = new Error(`Something went wrong with PATCHING ${par} info.`)
    e.status = 400
    next(e)
  })

})


module.exports = router
