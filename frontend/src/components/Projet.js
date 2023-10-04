import styles from "../sass/Projet.module.scss"
import { useState } from "react"
import React from 'react';

export default function Projet({ projet}) {
    const [liked, setLiked] = useState(false)

    

        const handleClick = () => {
            setLiked(!liked)
        }

    return(
        
        <div className={`${styles.projet}`} onClick={handleClick} >
            <div className={`${styles.imgContainer}`}>
               <img src={projet.image} alt="" /> 
            </div>
            <div className={`${styles.title}  `}>
                <div className="d-flex justify-content-between align-items-center">
                <h3  className="m5">{projet.title}</h3>
                <i  className={`fas fa-heart ${liked ? "text-error" : ""} m5`} ></i>
                </div>
                <p>Genre: {projet.genre.map((genre, index) => (<span key={index}>{genre}</span>)
                )}</p>
                <p>crée en {projet.year}</p>
            </div>
                
        </div>
        
    );
}