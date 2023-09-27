const router = require("express").Router();

const connection = require("../../database");

const multer = require("multer");


const storage = multer.memoryStorage(); // Stocke l'image en mémoire
const upload = multer({ storage: storage });



router.post("/uploadImage", upload.single("profileImage"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier n'a été téléchargé." });
    }
  
    const userId = req.body.idUsers; // Assurez-vous d'avoir un moyen d'identifier l'utilisateur
    console.log("userId", userId);
  
    // Insérez l'image dans la base de données
    const insertImageSql = "UPDATE users SET profile_image = ? WHERE idUsers = ?";
    connection.query(insertImageSql, [req.file.buffer, userId], (err, result) => {
      if (err) {
        console.error("Erreur de base de données :", err);
        return res.status(500).json({ message: "Erreur lors de la mise à jour de l'image de profil." });
      }
      res.status(200).json({ message: "Image de profil mise à jour avec succès." });
    });
  });
  
  router.get("/profileImage/:idUsers", (req, res) => {
    const userId = req.params.idUsers;
    
    // Récupérer l'image de profil de l'utilisateur depuis la base de données
    const getImageSql = "SELECT profile_image FROM users WHERE idUsers = ?";
    
    connection.query(getImageSql, [userId], (err, result) => {
      if (err) {
        console.error("Erreur de base de données :", err);
        res.status(500).json({ message: "Erreur lors de la récupération de l'image de profil." });
      } else if (result.length === 0) {
        res.status(404).json({ message: "Aucune image de profil trouvée pour cet utilisateur." });
      } else {
        // Envoyer l'image de profil en tant que réponse
        res.writeHead(200, {
          'Content-Type': 'image/jpeg', // Remplacez par le type MIME approprié de l'image
        });
        res.end(result[0].profile_image);
      }
    });
  });

  module.exports = router;