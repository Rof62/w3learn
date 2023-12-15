import AddProjet from "../../components/AddProjet/AddProjet";
import styles from "./admin.module.scss"
import React, { useState, useEffect, useContext } from "react";
import {AuthContext} from "../../context"

export default function Admin() {

    const [editingDescription, setEditingDescription] = useState(""); // État pour la description en cours d'édition
    const [editProjectId, setEditProjectId] = useState(null); // État pour suivre l'ID du projet en cours d'édition
    const [allTheProjet, setAllTheProjet] = useState([]);
    const {user} = useContext(AuthContext)


    useEffect(() => {
        async function getProjet() {
          try {
            const response = await fetch('https://wlearnjw3learn.mysql.db/api/admin/getProjetNoValidate');
            if (response.ok) {
              const projet = await response.json();
              const modifiedDataBack = projet.map((s) =>
                s.validation === 1 ? { ...s, validation: true } : { ...s, validation: false }
              );
              const newModifiedDatas = await Promise.all(
                modifiedDataBack.map(async (s) => {
                  if (s.validation === false) {
                    const response = await fetch(URL.createObjectURL(new Blob([new Uint8Array(s.image.data)])));
                    const text = await response.text();
                    s.image = text;
                  }
                  return { ...s };
                })
              );
              const projetsNonValides = newModifiedDatas.filter((projet) => !projet.validation);
            setAllTheProjet(projetsNonValides);
            }
          } catch (error) {
            console.error(error);
          }
        }
        getProjet();
      }, []);

      function handleValidation(idProjet, isChecked) {

        const { email } = user;
        // Envoyez une requête au backend pour mettre à jour l'état de validation
        fetch(`https://wlearnjw3learn.mysql.db/api/admin/project/${idProjet}`, {
          method: 'PATCH', // Vous pouvez utiliser la méthode appropriée
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ validation: isChecked, email }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
                // Supprimer le projet de la liste après validation
                setAllTheProjet((projets) =>
                    projets.filter((projet) => projet.idProjet !== idProjet)
                );
            }
        });
      }

      function handleDelete(idProjet) {

        const { email } = user;
        // Envoyer une requête au backend pour supprimer le projet
        fetch(`https://wlearnjw3learn.mysql.db/api/admin/deleteProject/${idProjet}`, {
          method: 'DELETE', // Utilisez la méthode DELETE pour supprimer le projet
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              // Mettre à jour la liste des projets après la suppression
              setAllTheProjet((projets) =>
                projets.filter((projet) => projet.idProjet !== idProjet)
              );
            }
          })
          .catch((error) => {
            console.error('Erreur lors de la suppression du projet :', error);
            // Gérer les erreurs ici selon vos besoins
          });
      }

      function handleEditDescription(idProjet, description) {
        // Mettre à jour l'état pour afficher le champ de saisie avec la description actuelle du projet
        setEditingDescription(description);
        setEditProjectId(idProjet);
      }
      
      function handleDescriptionChange(event) {
        // Mettre à jour l'état local lorsqu'il y a des modifications dans le champ de saisie
        setEditingDescription(event.target.value);
      }

      async function handleDescriptionUpdate(idProjet) {
        const { email } = user;
        try {
          // Envoyer une requête PATCH au backend pour mettre à jour la description du projet
          const response = await fetch(`https://wlearnjw3learn.mysql.db/api/admin/updateProjectDescription/${idProjet}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: editingDescription, email }),
          });
          if (response.ok) {
            // Mettre à jour localement la description du projet après la modification réussie
            setAllTheProjet(allTheProjet.map(projet => {
              if (projet.idProjet === idProjet) {
                return { ...projet, description: editingDescription };
              }
              return projet;
            }));
            // Remettre à zéro les états d'édition
            setEditingDescription("");
            setEditProjectId(null);
          }
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la description du projet :', error);
          // Gérer les erreurs ici selon vos besoins
        }
      }

console.log(allTheProjet);
    return(
        <div>
            <h1>bonjour</h1>
            <div className={` ${styles.card}`}>
                <h1>Page d'administration</h1>
                <div>
                  <AddProjet user={user}/>
                </div>
                    <table>
                        <thead>
                            <tr>
                                <th>image</th>
                                <th>Nom du projet</th>
                                <th>Description</th>
                                <th>année</th>
                                <th>link</th>
                                <th>Validation</th>
                            </tr>
                        </thead>
                    <tbody>
                        
          {allTheProjet.map((projet) => (
            <tr key={projet.idProjet}>
                <td className="d-flex justify-content-center align-items-center"><img style={{ width: "150px", height: "150px",display: "block"}} src={projet.image} alt="" /></td>
              <td>{projet.name}</td>
              <td>
                <div>
                {editProjectId === projet.idProjet ? (
        // Afficher un champ de saisie pour la modification si c'est le projet en cours d'édition
        <div>
          <input
            type="text"
            value={editingDescription}
            onChange={handleDescriptionChange}
          />
          <button className="btn btn-primary mr20 button" onClick={() => handleDescriptionUpdate(projet.idProjet)}>Valider</button>
        </div>
      ) : (
        // Sinon, afficher la description normalement avec un bouton de modification
        <div>
          {projet.description}
          <button className="btn btn-primary mr20 button" onClick={() => handleEditDescription(projet.idProjet, projet.description)}>Modifier</button>
        </div>
      )}
                </div>
              </td>
              <td>{projet.year}</td>
              <td>{projet.link}</td>
              <td>
                <div className="d-flex justify-content-center">
              <button onClick={() => handleDelete(projet.idProjet)} className="btn btn-primary mr20 button">supprimer</button>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                valider :
                <input
                  type="checkbox"
                  checked={projet.validation }
                  onChange={(e) => handleValidation(projet.idProjet, e.target.checked)}
                />
                </div>
                
              </td>
            </tr>
          ))}
                    </tbody>
                </table>
    </div>
  
        </div>
    )
}