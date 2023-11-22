const router = require("express").Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const {key, keyPub} = require("../../keys");

const connection = require("../../database/index");

router.post("/login", (req,res) => {
    
  const { email, password} = req.body
  const verifyMailSql = "Select * FROM users WHERE email = ?";
  connection.query(verifyMailSql, [email], (err, result) =>  {
      try {
          if(result.length > 0) {
              if (bcrypt.compareSync(password, result[0].password)) {
                  const token = jsonwebtoken.sign({}, key, {
                      subject: result[0].idUsers.toString(),
                      expiresIn: 3600 * 24 * 30,
                      algorithm: "RS256",
                  });
                  res.cookie("token", token, {maxAge: 30 * 24 * 60 * 60 * 1000});
                  res.json(result[0]);
              } else {
                  res.status(400).json("Email et/ou mot de passe incorrects"); 
              }
          } else {
              res.status(400).json("Email et/ou mot de passe incorrects");
          } 
      } catch (error) {
          console.log(error);
      }
  })
})

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

router.get("/userConnected", (req,res) => {
  const {token} = req.cookies;
  if (token) {
      try {
        const decodedToken = jsonwebtoken.verify(token, keyPub, {
          algorithms: "RS256"
        });
        const sqlSelect = " SELECT idUsers, username, email, role, blobby FROM users WHERE idUsers = ?";
        connection.query(sqlSelect, [decodedToken.sub], (err, result) => {
          if (err) throw err;
          const connectedUser = result[0];
          connectedUser.password = "";
          if (connectedUser) {
              res.json(connectedUser)
          } else {
              res.json(null)
          }
        })  
      } catch (error) {
          console.log(error);
      }
  } else {
      res.json(null)
  }
})

router.get("/logout", (req, res) => {
  res.clearCookie("token")
  res.json({ message: 'vous etes deconnecter'})
  console.log("deconnexion en cour");
})

  router.get("/getUserList", (req, res) => {
    const sql = "SELECT * FROM users ";
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(JSON.stringify(result));
    });
  });

  

  module.exports = router;