const router = require("express").Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const {key, keyPub} = require("../../keys");
const nodemailer = require ("nodemailer");
require ("dotenv").config()

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  }
})

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
  const { email, password, username } = req.body;

  const token = jsonwebtoken.sign({ email, username, password }, key, {
    expiresIn: '24h',
    algorithm: "RS256",
  });

  const verifyMailSql = "SELECT * FROM users WHERE email = ?";
  connection.query(verifyMailSql, [email], async (err, result) => {
    try {
      if (result.length === 0) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertSql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        connection.query(insertSql, [username, email, hashedPassword], (err, result) => {
          if (err) throw err;

          const mailOptions = {
            from: 'w3learn.w3@gmail.com',
            to: email,
            subject: 'Confirmez votre inscription',
            text: `Cliquez sur ce lien pour confirmer votre inscription : http://localhost:3000/confirmRegistration/${token}`,
          };

          transporter.sendMail(mailOptions, (emailErr, info) => {
            if (emailErr) {
              console.error('Erreur lors de l\'envoi de l\'e-mail de confirmation :', emailErr);
              res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail de confirmation' });
            } else {
              res.status(201).json("Inscription réussie. Vérifiez votre e-mail pour confirmer votre inscription.");
            }
          });
        });
      } else {
        res.status(400).json("Le mail existe");
      }
    } catch (error) {
      res.status(500).json({ error: "Une erreur interne s'est produite." }) ;
    }
  });
});

// La nouvelle route pour la confirmation d'inscription


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

  router.get("/resetPassword/:email", (req, res) => {
    console.log(req.params);
    const email = req.params.email;
    const sqlSearchMail = "SELECT * FROM users WHERE email = ?"
    connection.query(sqlSearchMail, [email], (err, result) => {
      if (err) throw err;
      if (result.length !== 0 ) {
        const confirmLink = `http://localhost:3000/resetPassword?email=${email}`;
        const mailOptions = {
          from: "w3learn.w3@gmail.com",
          to: email,
          subject: "mot de passe oublié de tel site",
          text: ` Cliquer sur ce lien pour modifier votre mot de passe : ${confirmLink}`
  
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            throw err;
          } else {
            res.end();
          }
  
        })
      }
    })
  })

  

  module.exports = router;