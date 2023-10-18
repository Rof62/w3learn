const router = require("express").Router();
const bcrypt = require("bcrypt");

const connection = require("../../database/index");

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT idUsers, username, password, blobby FROM users WHERE email=? `;
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
        resultBack.blobby = result[0].blobby;
        resultBack.password = dbPassword;
        res.json(resultBack);
      }
    });
  });

  router.post("/addUser", (req, res) => {
    const {email, password, username} = req.body;
    
    const verifyMailSql = "Select * FROM users WHERE email = ?";
    connection.query(verifyMailSql, [email], async (err, result) => {
        try {
          if(result.length === 0) {
            console.log("here");
            const hashedPassword = await bcrypt.hash(password, 10);
            const insertSql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            connection.query(insertSql, [username, email, hashedPassword], (err, result) => {
                if (err) throw err;
                let idUser = result.insertId;
                const sqlSelect = "SELECT idUsers, username, email FROM users WHERE idUsers = ?";
                connection.query(sqlSelect, [idUser], (err, result) => {
                    if (err) throw err;
                    res.status(201).json("Inscription réussie" );
                })
            })
          } else {
            console.log("there");
            res.status(400).json("le mail existe");
          }  
        } catch (error) {
           res.status(500).end("Une erreur interne s'est produite") 
        }
    })
})

  router.get("/getUserList", (req, res) => {
    const sql = "SELECT * FROM users ";
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(JSON.stringify(result));
    });
  });

  

  module.exports = router;