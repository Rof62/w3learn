const router = require("express").Router();


const connection = require("../../database/index");

router.get('/getProjetNoValidate', (req, res) => {
    // Exécutez une requête SQL pour sélectionner tous les projets validés (avec validate = 1)
    const query = 'SELECT * FROM projet WHERE validation = 0';
    connection.query(query, (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête SQL:', err);
        res.status(500).json({ error: 'Une erreur s\'est produite' });
      } else {
        res.json(result);
      }
    });
  });

  router.patch('/project/:id', (req, res) => {
    const idProjet = req.params.id;
    const { validation } = req.body;
  
    // Exécutez une requête SQL pour mettre à jour l'état de validation du projet dans la base de données
    const query = 'UPDATE projet SET validation = ? WHERE idProjet = ?';
    connection.query(query, [validation, idProjet], (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour de la validation du projet:', err);
        res.status(500).json({ error: 'Une erreur s\'est produite' });
      } else {
        res.json({ success: true });
      }
    });
  });

module.exports = router;