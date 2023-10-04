const router = require("express").Router();
const multer = require('multer');
const upload = multer();

const connection = require("../../database/index");

router.get("/getAvatarFromUser", (req, res) => {
  const id = req.query.id;
  console.log(req.query);
  const sql = "SELECT blobby FROM users WHERE idUsers = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});


  router.get('/getDefaultImage', (req, res) => {
    const sql = " SELECT blobby FROM image LIMIT 1";
    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.send(result[0]);
    });
  })

  router.patch("/insertImage", (req, res) => {
    console.log(req.body);
    const idUser = req.body.idUsers;
    const blobby = req.body.value;
  
    const updateSQL = "UPDATE users SET blobby = ? WHERE idUsers = ?";
    connection.query(updateSQL, [blobby, idUser], (err, result) => {
      if (err) throw err;
    });
    const searchSQL = "SELECT blobby FROM users WHERE idUsers = ?";
    connection.query(searchSQL, [idUser], (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    });
  });

  router.post('/addProjet', upload.single('image'), async (req, res) => {
    const { name, year, description, link, idUsers } = req.body;
    const imageBlob = req.body.image; // Supposons que le champ "image" contient le Blob
  
    // Insérez les données dans la base de données, y compris l'image Blob
    const insertSql = 'INSERT INTO projet (name, year, description, link, idUsers, image) VALUES (?, ?, ?, ?, ?, ?)';
  
    // Utilisez la méthode de connexion à la base de données pour exécuter la requête d'insertion
    connection.query(insertSql, [name, year, description, link, idUsers, imageBlob], (err, result) => {
      if (err) {
        console.error("Erreur de base de données :", err);
        return res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout du projet." });
      }
  
      // Si l'insertion réussit, renvoyez une réponse avec un statut 201 (Created)
      res.status(201).json({
        message: "Projet ajouté avec succès",
        messageGood: "Projet ajouté avec succès une confirmation vous sera envoyer ,une fois que le projet sera validée.",
        projet: {
          name,
          year,
          description,
          link,
          idUsers,
        },
      });
    });
  });

  module.exports = router;