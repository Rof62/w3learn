import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Description() {
    const { idProjet } = useParams();
  const [projet, setProjet] = useState(null);


  useEffect(() => {
    // Ici, vous pouvez effectuer une requête pour obtenir les détails du projet en fonction de l'idProjet.
    // Par exemple :
    async function fetchProjet() {
      try {
        const response = await fetch(`http://localhost:8003/api/profileImage/projet/${idProjet}`);
        if (response.ok) {
          const data = await response.json();
          setProjet(data);
        } else {
          // Gérez le cas où le projet n'est pas trouvé, par exemple, redirigez l'utilisateur.
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjet();
  }, [idProjet]);
  

  if (!projet) {
    // Peut-être afficher un message de chargement ici
    return <div>Chargement en cours...</div>;
  }
    console.log(projet);
    return(
        <div>
           {projet.map((p) =>(
            <h1>{p.name}</h1>
           ))}

        </div>
    )
}