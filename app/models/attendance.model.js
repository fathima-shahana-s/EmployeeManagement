const sql = require("./db");
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const day = String(currentDate.getDate()).padStart(2, "0");

// const formattedDate = `${year}-${month}-${day}`;
const Attendance = function (attendance) {
  this.attendance_id = attendance.attendance_id;
  this.employee_id = attendance.employee_id;
  this.date = `${year}-${month}-${day}`;
  this.status = attendance.status; 
};

// Add attendance record
Attendance.create = (newAttendance, result) => {
  const sqlQuery = "INSERT INTO attendance SET ?";

  sql.query(sqlQuery, newAttendance, (err) => {

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Added new attendance record: ", {...newAttendance });
    result(null, {...newAttendance });
  });
};

// Delete attendance record (assuming deletion by attendance_id)
Attendance.remove = (attendanceId, result) => {
  const sqlQuery = "DELETE FROM attendance WHERE attendance_id = ?";
  const value = [attendanceId];

  sql.query(sqlQuery, value, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null); // Handle case where attendance_id not found
    } else {
      console.log("Attendance record deleted with ID:", attendanceId);
      result(null, res);
    }
  });
};


Attendance.getAll = (result) => {
  const query = "SELECT * FROM attendance";


  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("attendance: ", res);
    result(null, res);
    //result()
    //return result;
    //res.json(result)
    //result(null, res);
    //return;
  });
};

Attendance.updateById = (attendance_id, attendance, result) => {
  sql.query(
    "UPDATE attendance SET date = ?, status = ?,employee_id = ? WHERE attendance_id = ?",
    [attendance.date, attendance.status, attendance.employee_id, attendance_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found Attendance with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated attendance: ", { attendance_id: attendance_id, ...attendance });
      result(null, { attendance_id: attendance_id, ...attendance });
    }
  );
};

Attendance.findById = (attendance_id, result) => {
  sql.query(`SELECT * FROM attendance WHERE attendance_id = ${attendance_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};


module.exports = Attendance;














// =======
// const sql = require("./db");

// // constructor
// const Attendance = function(attendance) {
//   this.employee_id = attendance.employee_id;
//   this.attendance_id = attendance.attendance_id;
//   this.date = attendance.date;
//   this.status = attendance.status;
// };


// Attendance.updateById = (employee_id, attendance, result) => {
//   sql.query(
//     "UPDATE attendance SET date = ?, status = ?,attendance_id = ? WHERE employee_id = ?",
//     [attendance.date, attendance.status, attendance.attendance_id, employee_id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Attendance with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated attendance: ", { employee_id: employee_id, ...attendance });
//       result(null, { employee_id: employee_id, ...attendance });
//     }
//   );
// };


// module.exports = Attendance;
// >>>>>>> 973f93d99cf47d4d6df6111484e4bb65f53cb898














// // =======
// // const sql = require("./db");

// // // constructor
// // const Attendance = function(attendance) {
// //   this.employee_id = attendance.employee_id;
// //   this.attendance_id = attendance.attendance_id;
// //   this.date = attendance.date;
// //   this.status = attendance.status;
// // };


// // Attendance.findById = (emploee_id, result) => {
// //   sql.query(`SELECT * FROM attendance WHERE employee_id = ${employee_id}`, (err, res) => {
// // >>>>>>> 973f93d99cf47d4d6df6111484e4bb65f53cb898