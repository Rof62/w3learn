import { useEffect, useState } from "react";
import styles from "./Contributeur.module.scss"

export default function Contributeur({user}) {
    
    const {idUsers} = user
    const [allTheProjet, setAllTheProjet] = useState([])

    useEffect(() => {
        async function getProjet() {
          try {
            const response = await fetch(`https://w3learnback-production.up.railway.app/api/profileImage/getProjet/${idUsers}`);
            if (response.ok) {
              const projet = await response.json();
              console.log(idUsers);
              setAllTheProjet(projet);
            }
          } catch (error) {
            console.error(error);
          }
        }
        getProjet();
      }, [idUsers]);
      console.log(allTheProjet);
    return(
        <div >
            <div className="d-flex justify-content-center">
                <h2>Mes contribution au Blog</h2>
            </div>
              <table>
                        <thead>
                            <tr>
                                <th>nom</th>
                                <th>Validation</th>   
                            </tr>
                        </thead>
                <tbody>
                {allTheProjet.map((projet, index) => (
                  <tr key={projet.idProjet}>
                         <td> <h4 className={`ml20 `}> {projet.name}</h4></td> 
                      <td> { projet.validation ? <p className={`ml20 `}>projet valider ✅</p> : <p className={`ml20 ${styles.contribution}`}>❌projet en cours de validation...</p>} </td> 
                    </tr>  
            ))}
                </tbody>
            </table>
        </div>
        
    )
}