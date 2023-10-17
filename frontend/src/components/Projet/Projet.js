import styles from "../../sass/Projet.module.scss"

import React from 'react';
import { NavLink } from "react-router-dom";

export default function Projet({ projet}) {
    const {idProjet} = projet
        
    

    console.log(projet.image);
    return(
        
        
        <div className={`${styles.projet}`} >
            <NavLink to={`/description/${idProjet}`}>
            <div className={`${styles.imgContainer}`}>
               <img   src={projet.image} alt="" /> 
            </div>
            </NavLink>  
            <div className={`${styles.title}  `}>
                <div className="d-flex justify-content-between align-items-center">
                <h3  className="m5">{projet.name}</h3>
                
                </div>
                
                <p>crée en {projet.year}</p>
            </div>
            
        </div>
        
        
    );
}