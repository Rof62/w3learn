import styles from "../sass/Footer.module.scss"
import logo from "../img/logo.png"
// import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
    return(
        <div className={`${styles.footer}`}>
            <div className={`d-flex justify-content-between ${styles.mention}`}>
                <div>
                    <NavLink to="/home" ><img src={logo} alt="" className={`${styles.logo}`} /></NavLink> 
                </div>
                <div>
                    <h4>Mention légal</h4>
                    <p>Terme et Conditions</p>
                    <p>Politique de confidentialité</p>
                    <p>Politique en matière de cookies</p>
                    <p>Démenti</p>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <p>© 2023 We Learn.  Tous droits réservés.</p>
            </div>

        </div>
    )
}