const express = require("express");

const cors = require("cors");
const EmployeesRoutes = require("./app/routes/employees.routes");
const AttendanceRoutes = require("./app/routes/attendance.routes")

const app = express();

const db = require("./app/models/db");

const mysql = require("mysql");

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/employee", EmployeesRoutes)
app.use("/attendance", AttendanceRoutes)
// simple route
app.get("/", async (req, res) => {
  // const result = await db.query('SELECT * FROM name');
  // await res.json(result.recordset);
  res.json({ message: "Welcome to employee management application." });
});


require("./app/routes/employees.routes")(app);

require("./app/routes/attendance.routes")(app);

require("./app/routes/csv.routes")(app);
// require("./app/routes/employees.routes")(app);
// require("./app/routes/attendance.routes")(app);

// set port, listen for requests

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});