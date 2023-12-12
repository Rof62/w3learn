const router = require("express").Router();
const bcrypt = require("bcrypt");


const connection = require("../../database/index");

router.patch("/updateUsername", (req, res) => {
  console.log("username", req.body);

    const { username, idUsers } = req.body;
  
    // Utilisation de paramètres de requête
    const updateSql = `UPDATE users SET username = ? WHERE idUsers =?`;
  
    connection.query(updateSql, [username, idUsers], (err, result) => {
      if (err) {
        console.error("Erreur de base de données :", err);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du nom d'utilisateur." });
      } else {
        console.log("Nom d'utilisateur mis à jour en base de données");
  
        // Après la mise à jour réussie, vous pouvez renvoyer les nouvelles informations de l'utilisateur
        const getUserSql = "SELECT * FROM users WHERE idUsers = ?";
        connection.query(getUserSql, [idUsers], (err, user) => {
          if (err) {
            console.error("Erreur de base de données :", err);
            res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des informations de l'utilisateur." });
          } else {
            res.status(200).json({ message: "Nom d'utilisateur mis à jour avec succès", user: user[0] });
          }
        });
      }
    });
  });
  
  router.patch("/updateEmail", (req, res) => {
    console.log("email", req.body);
    const { email, idUsers } = req.body;
  
    // Utilisation de paramètres de requête
    const updateSql = `UPDATE users SET email = ? WHERE idUsers =?`;
  
    connection.query(updateSql, [email, idUsers], (err, result) => {
      if (err) {
        console.error("Erreur de base de données :", err);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du nom d'utilisateur." });
      } else {
        console.log("Email mis à jour en base de données");
  
        // Après la mise à jour réussie, vous pouvez renvoyer les nouvelles informations de l'utilisateur
        const getUserSql = "SELECT * FROM users WHERE idUsers = ?";
        connection.query(getUserSql, [idUsers], (err, user) => {
          if (err) {
            console.error("Erreur de base de données :", err);
            res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des informations de l'utilisateur." });
          } else {
            res.status(200).json({ message: "Nom d'utilisateur mis à jour avec succès", user: user[0] });
          }
        });
      }
    });
  });
  
  router.patch("/updatePassword", (req, res) => {
    const { email, password } = req.body;
  
    // Utilisation de paramètres de requête
    const updateSql = `UPDATE users SET password = ? WHERE email = ?`;
  
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Erreur de hachage du mot de passe :", err);
        return res.status(500).json({ message: "Une erreur s'est produite lors du hachage du mot de passe." });
      }
  
      connection.query(updateSql, [hashedPassword, email], (err, result) => {
        if (err) {
          console.error("Erreur de base de données :", err);
          return res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du mot de passe." });
        }
  
        console.log("Mot de passe mis à jour en base de données");
  
        // Renvoyer une réponse si nécessaire
        return res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
      });
    });
  });

  router.delete("/deleteUserAccount", (req, res) => {
    const { idUsers } = req.body;
    res.clearCookie("token")
    const deleteQuery = 'DELETE FROM users WHERE idUsers = ?';
    connection.query(deleteQuery, [idUsers], (err, result) => {
      if (err) {
        console.error('Erreur lors de la suppression du compte utilisateur :', err);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression du compte utilisateur.' });
      } else {
        // Suppression réussie, renvoyer une confirmation
        res.json({ success: true, message: 'Compte utilisateur supprimé avec succès.' });
      }
    });
  });

  module.exports = router;