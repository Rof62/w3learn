import styles from "./Blog.module.scss"
import Projet from "../../components/Projet/Projet"

import React, { useState, useEffect } from "react"

import { NavLink } from "react-router-dom";



export default function Blog() {
    const [filter, setFilter] = useState("")
    const [allTheProjet, setAllTheProjet] = useState([])
    

    const handleInput = (e) =>{
        const search = e.target.value;
        setFilter(search.trim().toLowerCase())
    }

    useEffect(() => {
        async function getProjet() {
          try {
            const response = await fetch(`http://localhost:8003/api/profileImage/getProjetValidate`);
            if (response.ok) {
              const projet = await response.json();
              const modifiedDataBack = projet.map((s) =>
                s.validation === 1 ? { ...s, validation: true } : { ...s, validation: false }
              );
              const newModifiedDatas = await Promise.all(
                modifiedDataBack.map(async (s) => {
                  if (s.validation === true) {
                    const response = await fetch(URL.createObjectURL(new Blob([new Uint8Array(s.image.data)])));
                    const text = await response.text();
                    
                    s.image = text;
                  }
                  return { ...s };
                  
                })
              );
              setAllTheProjet(newModifiedDatas);
            }
          } catch (error) {
            console.error(error);
          }
        }
        getProjet();
      }, []);
      
      console.log(allTheProjet);
    return(
        <>
        
        <div className="flex-fill container">
            <h1 className="my mb20 30">Bienvenue sur notre blog!</h1>
                <div className={`${styles.card} p20 d-flex flex-column mt20 `}>
                    <div className={`d-flex justify-content-center align-items-center my30 ${styles.search}`}>
                        <i className="fas fa-magnifying-glass mr10"></i>
                        <input onInput={handleInput} className="flex-fill p20" type="text" placeholder="Rechercher" />
                    </div>
                    <div className={`${styles.grid}`}>
                        {allTheProjet
                            .filter((s) => s.name.toLowerCase().startsWith(filter))
                            .map((projet) => (
                            <Projet key={projet.idProjet} projet={projet} />
                        ))}
                    </div>
                </div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center m20">
            <h2>Vous voulez contribuer au Blog ?</h2>
            <br />
            <li><NavLink to="/inscription" className={`${styles.li}`}>Inscrivez-vous !</NavLink></li>
        </div>
        </>
    )
}
