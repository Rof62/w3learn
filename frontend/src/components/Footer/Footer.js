import styles from "./Footer.module.scss"
import logo from "../../img/logo.png"
// import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
    return(
        <div className={`${styles.footer}`}>
            <div className={`d-flex justify-content-between ${styles.mention}`}>
                <div>
                    <NavLink to="/" ><img src={logo} alt="" className={`${styles.logo}`} /></NavLink> 
                </div>
                <div>
                    <div className={`${styles.ul2}`}>
                        <ul>
                            <li>Contact</li>
                            <br />
                            <li><a className={`${styles.li}`}  href="mailto:W3learn.w3@gmail.com" target="_blank">W3learn.w3@gmail.com</a></li>
                        </ul>
                    </div>
                    
                    <div className={`${styles.ul}`}>
                    <ul >
                    <li>Mention légal</li>
                    <br />
                    <li><NavLink className={`${styles.li}`} to="/termes" >Termes et Conditions</NavLink></li>
                    <li><NavLink className={`${styles.li}`} to="/termes" >Politique de confidentialité</NavLink></li>
                    <li><NavLink className={`${styles.li}`} to="/termes" >Politique en matière de cookies</NavLink></li>
                    <li><NavLink className={`${styles.li}`} to="/termes" >Démenti</NavLink></li>
                    </ul>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center ">
                <p>© 2023 We Learn.  Tous droits réservés.</p>
            </div>

        </div>
    )
}