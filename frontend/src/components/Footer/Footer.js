import styles from "./Footer.module.scss"
import logo from "../../img/logo.png"
// import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
    return(
        <footer className={`${styles.footer}`}>
            <div className={styles.topFooter}>
                    <NavLink className={styles.ul} to="/" ><img src={logo} alt="" className={`${styles.logo}`} /></NavLink> 
                         <ul className={styles.ul}>
                            <li className="mb20">Contact</li>
                            <li><a className={styles.a} href="mailto:W3learn.w3@gmail.com" target="_blank">W3learn.w3@gmail.com</a></li>
                        </ul>
                        <ul className={styles.ul}>
                            <li className="mb20">Mention légal</li>
                            <li><NavLink to="/termes" className={styles.a}>Termes et Conditions</NavLink></li>
                            <li><NavLink to="/termes" className={styles.a}>Politique de confidentialité</NavLink></li>
                            <li><NavLink to="/termes" className={styles.a}>Politique en matière de cookies</NavLink></li>
                            <li><NavLink to="/termes" className={styles.a}>Démenti</NavLink></li>
                        </ul>
            </div>
                <div className={styles.bottomFooter}>
                <p>© 2023 We Learn.  Tous droits réservés.</p>
                </div>
        </footer>
    )
}