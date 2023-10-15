import { useEffect, useState } from "react";

export default function Contributeur({user}) {
    console.log(user);
    const {idUsers} = user
    const [allTheProjet, setAllTheProjet] = useState([])

    useEffect(() => {
        async function getProjet() {
          try {
            const response = await fetch(`http://localhost:8003/api/profileImage/getProjet/${idUsers}`);
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
        <div>
            <div className="d-flex justify-content-center">
                <h2>Mes contribution au Blog</h2>
            </div>
            <div className="ml20">
                <p>{allTheProjet.map((projet, index) => (
                    <div key={index} className="d-flex align-items-center justify-content-around"  value={projet.idUsers}>
                        <h4 className="ml20"> {projet.name}:</h4>
                        <p>{ projet.validation ? <p className="ml20">projet valider ✅</p> : <p className="ml20">❌projet en cours de validation...</p>}</p> 
                    </div>
            ))}</p>
            </div>
        </div>
    )
}