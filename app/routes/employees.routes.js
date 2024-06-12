module.exports = app => {
  const employees = require("../controller/employees.controller");

  const router = require("express").Router();

  // Create a new employee
  router.post("/", employees.create);

  // Retrieve all employees
  router.get("/", employees.findAll);

  // Retrieve a single employee with id
  router.get("/:employee_id", employees.findOne);

  // Update a Employees with id
  router.put("/:employee_id", employees.update);

  // Delete a employee with id
  router.delete("/:employee_id", employees.delete);

  app.use("/api/employee", router);
};