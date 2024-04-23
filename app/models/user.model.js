const sql = require('./db')

const User = function(user) {
    this.user_id = user.user_id;
    this.name = user.name;
    this.email = user.email;
    this.is_admin = user.is_admin;
  };

  User.create = (newuser, result) => {
    sql.query("INSERT INTO user SET ?", newuser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created new user: ", { id: res.insertId, ...newuser });
      result(null, { id: res.insertId, ...newuser });
    });
  };

  // User.getAll((err, res) => {
  //   let query = "SELECT * FROM user";
  
  //   sql.query(query,(err, res)=>{
  //     if (err) {
  //       console.log("error: ", err);
  //       result(null, err);
  //       return;
  //     }
  
  //     console.log("user: ", res);
  //     result(null, res);
  //     return;
  //   });
  // });


  User.getAll = (result) => {
    let query = "SELECT * FROM user";
  
    sql.query(query,(err, res)=>{
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("user: ", res);
      result(null,res)
      // result()
      // return result;
      // res.json(result)
      // result(null, res);
      return;
    });
  };

  User.findById = (user_id, result) => {
    sql.query(`SELECT * FROM user WHERE user_id = ${user_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found employee: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      result({ kind: "not_found" }, null);
    });
  };
  module.exports = User;