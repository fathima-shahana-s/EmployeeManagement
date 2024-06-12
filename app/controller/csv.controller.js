const csv = require("../models/csv.model");

// Retrieve Attendance monthly.
exports.attndstatus = (req, res) => {
  const employee_id = req.query.employee_id;
  const month = req.query.month;

  if (employee_id === undefined || month === undefined) {
    res.status(404).send({
      message:
        "Specify emloyeeid and month",
    });
  }

  csv.write(res, employee_id, month, (err, data) => {
    if (err) {
      res.status(500).send({
        message:err.message || "Some error occurred while retrieving Attendance status.",
      });
    }
    res.send(data);
  });
};