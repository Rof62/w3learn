const router = require("express").Router();
const bcrypt = require("bcrypt");

const connection = require("../../database");

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT idUsers, username, password FROM users WHERE email=? `;
    connection.query(sql, [email], async (err, result) => {
      if (err) throw err;
      console.log(result);
      if (!result.length) {
        console.log("USER INCORRECT");
        let doesExist = { message: "User incorrect" };
        res.send(doesExist);
      } else {
        const dbPassword = result[0].password;
        const passwordMatch = await bcrypt.compare(password, dbPassword); //retourne un boolean
        if(!passwordMatch) {
          console.log("USER INCORRECT");
        let doesExist = { message: "User incorrect" };
        res.send(doesExist);
        }
        let resultBack = req.body;
        resultBack.idUsers = result[0].idUsers;
        resultBack.username = result[0].username;
        resultBack.password = dbPassword;
        res.json(resultBack);
      }
    });
  });

  router.post("/addUser", async (req, res) => {
    
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sqlVerify = `SELECT * FROM users WHERE email=?`;
    console.log(req.body);
  
    connection.query(sqlVerify, {email}, (err, result) => {
      if (err) throw err;
      if(result.length) {
        console.log("email existant");
        let isEmail = { message: "email existant" };
        res.send(isEmail)
      } else {
        const sqlInsert = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
        const values = [username, email, hashedPassword];
        connection.query(sqlInsert, values, (err, result) => {
          if(err) throw err;
          let idUser = result.insertId;
          req.body.password = "";
          req.body.confirmPassword = "";
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