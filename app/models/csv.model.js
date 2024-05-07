const sql = require('./db')
const { readFile, writeFile } = require('fs').promises;
const { parseAsync } = require('json2csv');

const CSVfun = function (employees) {
  // this.employee_id = employees.employee_id;
  // this.dept = employees.dept;
  // this.other_details = employees.other_details;   
  // this.name = employees.name;
  // this.email = employees.email;
};



CSVfun.write = async function (response,emploee_id,month) {
  const query = sql.format("SELECT e.employee_id,e.name AS employee_name, DATE_FORMAT(a.date, '%Y-%m') AS month,SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_count,SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) AS absent_count FROM attendance a INNER JOIN employees e ON a.employee_id = e.employee_id GROUP BY e.employee_id HAVING month = ?;", [month])
  
  console.log(query)
  sql.query("SELECT e.employee_id,e.name AS employee_name, DATE_FORMAT(a.date, '%Y-%m') AS month,SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_count,SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) AS absent_count FROM attendance a INNER JOIN employees e ON a.employee_id = e.employee_id GROUP BY e.employee_id HAVING e.employee_id = ? AND month = ?;", [employee_id, month],
  // sql.query("SELECT e.employee_id,e.name AS employee_name, DATE_FORMAT(a.date, '%Y-%m') AS month,SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_count,SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) AS absent_count FROM attendance a INNER JOIN employees e ON a.employee_id = e.employee_id GROUP BY e.employee_id HAVING month = ?;", [month],
    async (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      const data = await JSON.stringify(res)
      console.log(data)
      const fields = [
        "employee_id",
        "employee_name",
        "month",
        "present_count",
        "absent_count"]

      parseAsync(data, { fields })
        .then(async csv => {
          response.header('Content-Type', 'text/csv');
          response.attachment("data.csv");
          return response.send(csv)
          })
        .catch(err => console.error(err));
    });
}

module.exports = CSVfun;