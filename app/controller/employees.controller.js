const Employees = require("../models/employees.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an employee
  const employees = new Employees({
    employee_id: req.body.employee_id,
    dept: req.body.dept,
    other_details: req.body.other_details,
    name: req.body.name,
    email: req.body.email,
  });

  // Save employee in the database
  Employees.create(employees, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    else res.send(data);
  });
};

// Retrieve all employees from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Employees.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employee details."
      });
    else res.send(data);
  });
};

// Find a single employee with a id
exports.findOne = (req, res) => {
  Employees.findById(req.params.employee_id, (err, data) => {
    console.log("printing data")
    console.log(data)
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: res.statusCode,
          message: `Not found employee with id ${req.params.employee_id}.`
        });
      } else {
        if (isNaN(req.params.employee_id)){
          res.status(500).send({
            status: res.statusCode,
            message: "employee_id must be a number"
          });
        }else{
          res.status(500).send({
            message: "Error retrieving employee with id " + req.params.employee_id
          });
        }
       
      }
    } else res.send({ status: res.statusCode ,result:data });
  });
};


// Update a single employee with a id
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Employees.updateById(
    req.params.employee_id,
    new Employees(req.body),
    (err, data) => {
      if (err) {
        if (isNaN(req.params.employee_id)){
          res.status(500).send({
            status: res.statusCode,
            message: "employee_id must be a number"
          });
        /*if (err.kind === "not_found") {
          res.status(404).send({
            status: res.statusCode,
            message: `Not found employee with id ${req.params.employee_id}.`
          });*/
        } else {
            if (err.kind === "not_found") {
              res.status(404).send({
                status: res.statusCode,
                message: `Not found employee with id ${req.params.employee_id}.`
              });
          /*if (typeof req.params.employee_id === 'string' || req.params.employee_id instanceof String){
            res.status(500).send({
              status: res.statusCode,
              message: "employee_id must be a number"
            });*/
          }
          else{
            res.status(500).send({
              message: "Error updating employee with id " + req.params.employee_id
            });

          }
        }
      } else res.send({ status: res.statusCode ,result:data });
    }
  );
};


// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  Employees.remove(req.params.employee_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found employee with id ${req.params.employee_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete employee with id " + req.params.employee_id
        });
      }
    } else res.send({ message: `Employee was deleted successfully!` });
  });
};




