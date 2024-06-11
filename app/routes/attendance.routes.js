module.exports = app => {
  const attendance = require("../controller/attendance.controller.js");

  const router = require("express").Router();

  // Retrieve all Attendance
  router.get("/", attendance.findAll);

  // Retrieve a single attendance with id
  router.get("/:attendance_id", attendance.findOne);

  router.post("/", attendance.create);
  // Update a attendance with id
  router.put("/:attendance_id", attendance.update);

  router.delete("/:attendance_id", attendance.delete);

  app.use("/api/attendance", router);
};

