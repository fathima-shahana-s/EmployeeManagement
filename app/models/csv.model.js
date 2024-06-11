const sql = require("./db");
const { parseAsync } = require("json2csv");

const CSVfun = function () {};

CSVfun.write = async function (response, employee_id, month) {
  const query = sql.format(
    "SELECT e.employee_id, e.name AS employee_name, DATE_FORMAT(a.date, '%Y-%m') AS month, SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_count, SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) AS absent_count FROM attendance a INNER JOIN employees e ON a.employee_id = e.employee_id GROUP BY e.employee_id HAVING month = ?;",
    [month]
  );

  console.log(query);

  sql.query(
    "SELECT e.employee_id, e.name AS employee_name, DATE_FORMAT(a.date, '%Y-%m') AS month, SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_count, SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) AS absent_count FROM attendance a INNER JOIN employees e ON a.employee_id = e.employee_id GROUP BY e.employee_id HAVING e.employee_id = ? AND month = ?;",
    [employee_id, month],
    async (err, res) => {
      if (err) {
        console.log("error: ", err);
        response.status(500).send({
          message: "Some error occurred while retrieving attendance data."
        });
        return;
      }

      const data = JSON.stringify(res);
      console.log(data);
      const fields = [
        "employee_id",
        "employee_name",
        "month",
        "present_count",
        "absent_count"
      ];

      try {
        const csv = await parseAsync(data, { fields });
        response.header("Content-Type", "text/csv");
        response.attachment("data.csv");
        response.send(csv);
      } catch (parseError) {
        console.error(parseError);
        response.status(500).send({
          message: "Error converting data to CSV format."
        });
      }
    }
  );
};

module.exports = CSVfun;
