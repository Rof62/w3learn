import styles from "../sass/Blog.module.scss"
import Projet from "../components/Projet"
import { projet } from "../Data"
import { useState } from "react"
import { NavLink } from "react-router-dom";

export default function Blog() {
    const [filter, setFilter] = useState("")

    const handleInput = (e) =>{
        const search = e.target.value;
        setFilter(search.trim().toLowerCase())
    }
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
                        {projet
                            .filter((s) => s.title.toLowerCase().startsWith(filter))
                            .map((projet) => (
                            <Projet key={projet.id} projet={projet} />
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
