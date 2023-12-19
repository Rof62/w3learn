import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from "./Description.module.scss"

export default function Description() {
    const { idProjet } = useParams();
    console.log(idProjet);
  const [projet, setProjet] = useState(null);


  useEffect(() => {
    // Ici, vous pouvez effectuer une requête pour obtenir les détails du projet en fonction de l'idProjet.
    // Par exemple :
    async function fetchProjet() {
      try {
        const response = await fetch(`http://localhost:8003/api/profileImage/projet/${idProjet}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
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
  
  console.log(projet);

  if (!projet) {
    return <div>Chargement en cours...</div>;
  }
    return(
      <main>
        {/* {!projet && <div>Chargement en cours...</div>} */}
        <section className={`cards ${styles.description}`}>
           {projet.map((p) =>(
            <article >
                <div className={`d-flex justify-content-center mt20 mb20 ${styles.test2}`}>
                    <h4 >{p.name}</h4>
                </div>
                <div className='d-flex flex-column flex-wrap mb20'>
                    <div className={`d-flex  ${styles.image}`}>
                        <div  className={`d-flex flex-column align-items-center justify-content-center ${styles.test}`}> 
                          <img src={p.image} alt="" /> 
                          <p className=''>Année de creation : {p.year} </p>
                        </div> 
                        <div className={`d-flex justify-content-center text-align ${styles.test}`}>
                          <p>{p.description}</p>
                          
                        </div>     
                    </div>
                    <div className="d-flex justify-content-around">
                            <div className={`d-flex justify-content-around ${styles.lien}`}>
                                <div className='d-flex align-items-center'>
                                    <p>Lien utile :</p>
                                    <Link target="-blank" className={styles.link} to={p.link}>{p.link}</Link>
                                </div>  
                            </div>
                        </div>
                    </div>
              </article>
            ))}
        </section>
      </main>
        )
    }