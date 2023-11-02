import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from "./Description.module.scss"

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
          const modifiedDataBack = data
          const newModifiedDatas = await Promise.all(
            modifiedDataBack.map(async (s) => {
              
                const response = await fetch(URL.createObjectURL(new Blob([new Uint8Array(s.image.data)])));
                const text = await response.text();
                s.image = text;
              
              return { ...s };
              
            })
          );
          setProjet(newModifiedDatas);
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjet();
  }, [idProjet]);
  

  if (!projet) {
    return <div>Chargement en cours...</div>;
  }
    console.log(projet);
    return(
        <div className={`cards ${styles.description}`}>
           {projet.map((p) =>(
            <div >
                <div className={`d-flex justify-content-center mt20 mb20 ${styles.test2}`}>
                    <h3 >{p.name}</h3>
                </div>
                <div className='d-flex justify-content-around mb20'>
                    <div className={`d-flex flex-column ${styles.image}`}>
                        <img src={p.image} alt="" />
                        <h3>Année de creation : {p.year} </h3>
                    </div>
                    <div className={styles.test}>
                        <p>{p.description}</p>
                            <div className={`d-flex justify-content-around ${styles.lien}`}>
                                <div className='d-flex align-items-center'>
                                    <h3>Lien utile :</h3>
                                    <Link target="-blank" className={styles.link} to={p.link}>{p.link}</Link>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        )
    }