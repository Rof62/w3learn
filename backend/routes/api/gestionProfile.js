const router = require("express").Router();


const connection = require("../../database");

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
    const { password, idUsers } = req.body;
  
    // Utilisation de paramètres de requête
    const updateSql = `UPDATE users SET password = ? WHERE idUsers = ?`;
  
    connection.query(updateSql, [password, idUsers], (err, result) => {
      if (err) {
        console.error("Erreur de base de données :", err);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du nom d'utilisateur." });
      } else {
        console.log("Password mis à jour en base de données");
  
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

  module.exports = router;