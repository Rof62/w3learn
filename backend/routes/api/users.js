const router = require("express").Router();

const connection = require("../../database");

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT idUsers, username FROM users WHERE email="${email}" AND password="${password}"`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      if (!result.length) {
        console.log("USER INCORRECT");
        let doesExist = { message: "User incorrect" };
        res.send(doesExist);
      } else {
        let resultBack = req.body;
        resultBack.idUsers = result[0].idUsers;
        resultBack.username = result[0].username;
        res.json(resultBack);
      }
    });
  });

  router.post("/addUser", (req, res) => {
    console.log(req.body);
    const {username, email, password} = req.body;
    const sqlVerify = `SELECT * FROM users WHERE email="${email}"`;
  
    connection.query(sqlVerify, (err, result) => {
      if (err) throw err;
      if(result.length) {
        console.log("email existant");
        let isEmail = { message: "email existant" };
        res.send(isEmail)
      } else {
        const sqlInsert = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
        const values = [username, email, password];
        connection.query(sqlInsert, values, (err, result) => {
          if(err) throw err;
          let idUser = result.insertId;
          console.log(idUser); 
        });
        let isEmail = { messageGood: "inscription reussi ! Vous allez être rediriger" };
        res.send(isEmail)
      }
    });
  });

  router.get("/getUserList", (req, res) => {
    const sql = "SELECT * FROM users ";
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(JSON.stringify(result));
    });
  });

  module.exports = router;