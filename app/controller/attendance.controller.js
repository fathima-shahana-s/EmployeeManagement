const Attendance = require("../models/attendance.model");


// Retrieve all Attendance from the database (with condition).
exports.findAll = (req, res) => {
  Attendance.getAll((err, data) => {
    if (err)
      res.status(500).send({
        status: res.statusCode,
        message:
          err.message || "Some error occurred while retrieving Attendances."
      });
    else res.send({ status: res.statusCode, result: data });
  });
};

// Find a single Attendance with a id
exports.findOne = (req, res) => {

  Attendance.findById(req.params.attendance_id, (err, data) => {
    console.log("printing data")
    console.log(data)
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: res.statusCode,
          message: "Not found Attendance with id " + req.params.attendance_id
        });
      } else {
        if(isNaN(req.params.attendance_id))
        {
          res.status(500).send({
            status: res.statusCode,
            message: "attendance_id must be a number"
          });
        } else{
        res.status(500).send({
          message: "Error retrieving Attendance with id " + req.params.attendance_id

        });
      }
      }
    } else res.send({ status: res.statusCode, result: data});
  });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  const attendance = new Attendance({
    attendance_id: req.body.attendance_id,
    employee_id: req.body.employee_id,
    date: req.body.date,
    status: req.body.status,
  });
  //Add attendance
  Attendance.create(attendance, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Attendance."
      });
      else res.send({status: res.statusCode, result: data });
  });
  
};

// Update a Attendance identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Attendance.updateById(
    req.params.attendance_id,
    new Attendance(req.body),
    (err, data) => {
      if (err) {
        
         console.log(isNaN("req.params.attendance_id54345"))
         if (isNaN(req.params.attendance_id)) {
          res.status(500).send({
            status: res.statusCode,
            message: "attendance_id must be a number"
          });
        }
        else if (err.kind === "not_found") {
          res.status(404).send({
            status: res.statusCode,
            message: "Not found Attendance with id " +req.params.attendance_id 
          });
        } else {
          res.status(500).send({
            message: "Error updating Attendance with id " + req.params.attendance_id
          });
        }
      } else res.send({status: res.statusCode, result: data });
    }
  );
};

exports.delete = (req, res) => {
  Attendance.remove(req.params.attendance_id, (err, data) => {
    if (err) {
      console.log(isNaN("req.params.attendance_id54345"))
         if (isNaN(req.params.attendance_id)) {
          res.status(500).send({
            status: res.statusCode,
            message: "attendance_id must be a number"
          });
        }
        else if (err.kind === "not_found") {
          res.status(404).send({
            status: res.statusCode,
            message: "Not found Attendance with id " +req.params.attendance_id 
          });
      } else {
        res.status(500).send({
          message: "Could not delete attendance with id " + req.params.attendance_id
        });
      }
    } else res.send({ message: `Attendance was deleted successfully!` });
  });
};