import styles from "./admin.module.scss"
import React, { useState, useEffect } from "react"

export default function Admin() {

    const [allTheProjet, setAllTheProjet] = useState([])

    useEffect(() => {
        async function getProjet() {
          try {
            const response = await fetch('http://localhost:8003/api/admin/getProjetNoValidate');
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
        // Envoyez une requête au backend pour mettre à jour l'état de validation
        fetch(`http://localhost:8003/api/admin/project/${idProjet}`, {
          method: 'PATCH', // Vous pouvez utiliser la méthode appropriée
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ validation: isChecked }),
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
console.log(allTheProjet);
    return(
        <div>
            <h1>bonjour</h1>
            <div className={` ${styles.card}`}>
                <h1>Page d'administration</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>image</th>
                                <th>Nom du projet</th>
                                <th>Description</th>
                                <th>année</th>
                                <th>Validation</th>
                            </tr>
                        </thead>
                    <tbody>
                        
          {allTheProjet.map((projet) => (
            <tr key={projet.idProjet}>
                <td><img style={{ width: "200px", height: "100px",display: "block"}} src={projet.image} alt="" /></td>
              <td>{projet.name}</td>
              <td>{projet.description}</td>
              <td>{projet.year}</td>
              <td>
                <input
                  type="checkbox"
                  checked={projet.validation }
                  onChange={(e) => handleValidation(projet.idProjet, e.target.checked)}
                />
              </td>
            </tr>
          ))}
                    </tbody>
                </table>
    </div>
  
        </div>
    )
}