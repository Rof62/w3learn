const router = require("express").Router();

const nodemailer = require ("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "w3learn.w3@gmail.com",
    pass: "jwmn vxia sbvi mgck",
  }
})


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
    const { validation, email } = req.body; // Récupérez l'email ici

    // Exécutez une requête SQL pour mettre à jour l'état de validation du projet dans la base de données
    const query = 'UPDATE projet SET validation = ? WHERE idProjet = ?';
    connection.query(query, [validation, idProjet], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour de la validation du projet:', err);
            res.status(500).json({ error: 'Une erreur s\'est produite' });
        } else {
            const mailOptions = {
                from: 'w3learn.w3@gmail.com',
                to: email,
                subject: 'Projet validé',
                text: 'Votre projet a été validé avec succès.'
            };

            transporter.sendMail(mailOptions, (emailErr, info) => {
                if (emailErr) {
                    console.error('Erreur lors de l\'envoi de l\'e-mail de validation du projet :', emailErr);
                    res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail de validation du projet' });
                } else {
                    res.json({ success: true, message: 'Projet validé avec succès. Email envoyé.' });
                }
            });
        }
    });
});

router.delete('/deleteProject/:id', (req, res) => {
  const { id } = req.params;

  const deleteInfosQuery = 'DELETE FROM infos WHERE idProjet = ?';
  connection.query(deleteInfosQuery, [id], (err, infosResult) => {
      if (err) {
          console.error('Erreur lors de la suppression des informations associées au projet :', err);
          return res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression des informations associées au projet' });
      }

      const deleteQuery = 'DELETE FROM projet WHERE idProjet = ?';
      connection.query(deleteQuery, [id], (err, result) => {
          if (err) {
              console.error('Erreur lors de la suppression du projet:', err);
              res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression du projet' });
          } else {
              const { email } = req.body; // Récupérer l'e-mail de la requête

              const mailOptions = {
                  from: 'w3learn.w3@gmail.com',
                  to: email,
                  subject: 'Projet supprimé',
                  text: 'Nous sommes désoler votre projet a été refuser, ils ne convanait pas a notre politique.'
              };

              transporter.sendMail(mailOptions, (emailErr, info) => {
                  if (emailErr) {
                      console.error('Erreur lors de l\'envoi de l\'e-mail de suppression du projet :', emailErr);
                      return res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail de suppression du projet' });
                  } else {
                      res.json({ success: true, message: 'Projet supprimé avec succès. Email envoyé.' });
                  }
              });
          }
      });
  });
});

module.exports = router;