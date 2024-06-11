module.exports = app =>{
  const csv = require("../controller/csv.controller");

  const router = require("express").Router();

  // Retrieve all employees
  router.get("/", csv.attndstatus);

  app.use("/api/getcsv", router);

};