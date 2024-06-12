const sql = require("./db");

const Employees = function(employees) {
  this.employee_id = employees.employee_id;
  this.dept = employees.dept;
  this.other_details = employees.other_details;
  this.name = employees.name;
  this.email = employees.email;
};

Employees.create = (newemployees, result) => {
  const sqlQuery = "INSERT INTO employees SET ?";

  sql.query(sqlQuery, newemployees, (err) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created new employees: ", {...newemployees });
    result(null, {...newemployees });
  });
};

Employees.getAll = (result) => {
  const query = "SELECT * FROM employees";
  sql.query(query,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("employees: ", res);
    result(null,res);
    // result()
    // return result;
    // res.json(result)
    // result(null, res);
    //return;
  });
};

Employees.findById = (employee_id, result) => {
  sql.query(`SELECT * FROM employees WHERE employee_id = ${employee_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee: ", res[0]);
      result(null, {...res[0]});
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Employees.updateById = (employee_id, employees, result) => {
  sql.query(
    "UPDATE employees SET dept = ?, other_details = ?, name = ?, email = ? WHERE employee_id = ?",
    [employees.dept, employees.other_details, employees.name, employees.email, employee_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated employees: ", { employee_id: employee_id, ...employees });
      result(null, { employee_id: employee_id, ...employees });
    },
  );
};
Employees.remove = (employee_id, result) => {
  sql.query("DELETE FROM Employees WHERE employee_id = ?", employee_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows === 0) {
      // not found Employee with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted Employees with employee_id: ", employee_id);
    result(null, res);
  });
};

module.exports = Employees;