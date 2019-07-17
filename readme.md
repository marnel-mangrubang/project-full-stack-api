# Exercise: Full Stack Coworking

This project will test your ability to build a RESTful API from scratch. This project should utilize the following technologies:

- Node.js
- MongoDB
- Mongoose

## Instructions

You will be building a full-stack API with the following resources based off of a coworking space. In addition to the specified fields, you should include the `_id`, `created_at`, and `updated_at` fields.

- **Unit:** The **Unit** resource is a generic term for a rentable space.
  - **kind:** (Required) The kind of unit available. _Only_ the following options should be allowed: "seat", "desk", "small office", "large office", "floor".
  - **floor:** (Required) An integer which represents the floor the rentable unit is on.
  - **special_monthly_offer:** An optional integer field. If filled in, represents a special deal that the company will be paying _in cents_. For example, if the unit is being leased for $600/mo, this field would be `600000`.
  - **company:** The **Company** resource, listed below.
- **Company:** The company that is leasing the rentable unit.
  - **name:** (Required) The name of the company.
  - **contact_email:** (Required) An email address that is used to contact the company. This should be [validated](https://mongoosejs.com/docs/validation.html) so that only a valid email can be entered.
  - **employees:** An array of the **Employee** resource, listed below.
- **Employee:** An employee at a given company.
  - **first_name:** (Required) The given first name of the employee.
  - **last_name:** (Required) The given last name of the employee.
  - **preferred_name:** The preferred name (i.e. nickname) of the employee.
  - **position:** The employee's title at the company.
  - **birthday:** The employee's date of birth.
  - **email:** (Required) An email address to contact the given employee. This should be [validated](https://mongoosejs.com/docs/validation.html) so that only a valid email can be entered.

Your API should include the following routes with the specified functionality.

- [ ] [GET /api/v1/units](#GET-apiv1units)
- [ ] [GET /api/v1/units?kind=[kind]](#GET-apiv1unitskindkind)
- [ ] [GET /api/v1/units?floor=[integer]](#GET-apiv1unitsfloorinteger)
- [ ] [GET /api/v1/units?occupied=[true/false]](#GET-apiv1unitsoccupiedtruefalse)
- [ ] [PATCH /api/v1/units/[id]](#PATCH-apiv1unitsid)

- [ ] [PATCH /api/v1/units/[id]/company](#PATCH-apiv1unitsidcompany)
- [ ] [DELETE /api/v1/units/[id]/company](#DELETE-apiv1unitsidcompany)

- [ ] [GET /api/v1/units/[id]/company/employees](#GET-apiv1unitsidcompanyemployees)
- [ ] [GET /api/v1/units/[id]/company/employees/[id]](#GET-apiv1unitsidcompanyemployeesid)
- [ ] [POST /api/v1/units/[id]/company/employees](#POST-apiv1unitsidcompanyemployees)
- [ ] [PATCH /api/v1/units/[id]/company/employees/[id]](#PATCH-apiv1unitsidcompanyemployeesid)
- [ ] [DELETE /api/v1/units/[id]/company/employees/[id]](#DELETE-apiv1unitsidcompanyemployeesid)

- [ ] [GET /api/v1/companies](#GET-apiv1companies)
- [ ] [GET /api/v1/companies?name=[partial-query]](#GET-apiv1companiesnamepartial-query)
- [ ] [GET /api/v1/companies?employees_lte=[integer]](#GET-apiv1companiesemployees_lteinteger)
- [ ] [GET /api/v1/companies?employees_gte=[integer]](#GET-apiv1companiesemployees_gteinteger)

- [ ] [GET /api/v1/employees?name=[partial-query]](#GET-apiv1employeesnamepartial-query)
- [ ] [GET /api/v1/employees?birthday=[date]](#GET-apiv1employeesbirthdaydate)

**NOTE: Exclude the `_v` field from each document.**

### GET /api/v1/units

* e.g. `GET http://localhost:5000/api/v1/units`

Return a list of all of the units with all related information.

### GET /api/v1/units?kind=[kind]

* e.g. `GET http://localhost:5000/api/v1/units?kind=desk`

Return a list of all units where the kind is equal to the provided kind. If none are found, return an empty array.

### GET /api/v1/units?floor=[integer]

* e.g. `GET http://localhost:5000/api/v1/units?floor=2`

Return a list of all units that are on the provided floor. If none are found, return an empty array.

### GET /api/v1/units?occupied=[true/false]

* e.g. `GET http://localhost:5000/api/v1/units?occupied=true`

If `true`, return a list of all units that have a company associated with them. If `false`, return a list of all units that have no company associated with them. If none are found in either case, return an empty array.

### PATCH /api/v1/units/[id]

* e.g. `PATCH http://localhost:5000/api/v1/units/5`

Update the unit with whatever information is specified in the request body and return the newly updated document. If the ID provided does not match a unit, return a 404 and an appropriate message. **Note:** You should allow for the company to be added from this route, if provided.

### PATCH /api/v1/units/[id]/company

* e.g. `PATCH http://localhost:5000/api/v1/units/5/company`

Update the company associated with the given unit and return the newly updated document. This can also be used to change a unit's listing from being empty to being occupied. If the ID provided does not match a unit, return a 404 and an appropriate message.

### DELETE /api/v1/units/[id]/company

* e.g. `DELETE http://localhost:5000/api/v1/units/5/company`

Remove the company from the given unit. If the ID provided does not match a unit, return a 404 and an appropriate message.

### GET /api/v1/units/[id]/company/employees

* e.g. `GET http://localhost:5000/api/v1/units/5/company/employees`

Return all employees for the given company. If no company is listed, return a 404 and an appropriate message. If the ID provided does not match a unit, return a 404 and a _different_ appropriate message.

### GET /api/v1/units/[id]/company/employees/[id]

* e.g. `GET http://localhost:5000/api/v1/units/5/company/employees/12`

Return the specific employee for the given company. If no company is listed, return a 404 and an appropriate message. If the unit ID provided does not match a unit, return a 404 and a _different_ appropriate message. If no employee with that ID exists, return a _different_ appropriate message.

### POST /api/v1/units/[id]/company/employees

* e.g. `POST http://localhost:5000/api/v1/units/5/company/employees`

Create a new employee and return that employee for the given company. If no company is listed, return a 404 and an appropriate message. If the unit ID provided does not match a unit, return a 404 and a _different_ appropriate message. If the employee information is malformed in any way, return a 400 and an error message with as much detail as possible.

### PATCH /api/v1/units/[id]/company/employees/[id]

* e.g. `PATCH http://localhost:5000/api/v1/units/5/company/employees/12`

Update an employee and return that employee for the given company. If no company is listed, return a 404 and an appropriate message. If the unit ID provided does not match a unit, return a 404 and a _different_ appropriate message. If the employee information is malformed in any way, return a 400 and an error message with as much detail as possible. If no employee with that ID exists, return a _different_ appropriate message.

### DELETE /api/v1/units/[id]/company/employees/[id]

* e.g. `DELETE http://localhost:5000/api/v1/units/5/company/employees/12`

Destroy the employee document and return that employee's document for the given company. If no company is listed, return a 404 and an appropriate message. If the unit ID provided does not match a unit, return a 404 and a _different_ appropriate message. If no employee with that ID exists, return a _different_ appropriate message.

### GET /api/v1/companies

* e.g. `GET http://localhost:5000/api/v1/companies`

Return all companies with all their employees information. Do not return an unit information.

### GET /api/v1/companies?name=[partial-query]

* e.g. `GET http://localhost:5000/api/v1/companies?name=oog`

Return all companies with all their employees information based off of the partial search string. For example, the above search would return companies with the name of "Google" and "Ooga". Do not return any unit information. If no companies are found, return an empty array.

### GET /api/v1/companies?employees_lte=[integer]

* e.g. `GET http://localhost:5000/api/v1/companies?employees_lte=50`

Return all companies with all their employees where the number of employees is less than or equal to the given integer. Do not return any unit information. If no companies are found, return an empty array.

### GET /api/v1/companies?employees_gte=[integer]

* e.g. `GET http://localhost:5000/api/v1/companies?employees_gte=100`

Return all companies with all their employees where the number of employees is greater than or equal to the given integer. Do not return any unit information. If no companies are found, return an empty array.

### GET /api/v1/employees?name=[partial-query]

* e.g. `GET http://localhost:5000/api/v1/employees?name=ada`

Return all employees based off of the partial search string. The search should be for their full name. For example, the above search would return the following employees:

- Adaline Smith
- Surya Adana
- Augusta "Ada" King-Noel

Do not return any unit or company information. If no employees are found, return an empty array.

### GET /api/v1/employees?birthday=[date]

* e.g. `GET http://localhost:5000/api/v1/employees?birthday=[date]`

Return all employees who have a birthday on the given date. Do not return any unit or company information. If no employees are found, return an empty array.
