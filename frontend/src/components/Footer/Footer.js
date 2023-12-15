import styles from "./Footer.module.scss"
import logo from "../../img/logo.png"
import logo2 from "../../img/logos_facebook.png"
import logo3 from "../../img/logos_instagram.png"
import logo4 from "../../img/logos_reddit.png"
import logo5 from "../../img/pajamas_twitter (1).png"
// import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
    return(
        <footer className={`${styles.footer}`}>
            <div className={styles.topFooter}>
                <div className="d-flex flex-column align-items-center">
                    <NavLink className={styles.ul} title="lien pour aller sur la page d'accueil" to="/" ><img src={logo} alt="logo du site" className={`${styles.logo}`} /></NavLink> 
                    <div className={`d-flex ${styles.reseau}`}>
                        <a href=""><img src={logo2} alt="lien pour aller sur facebook" /></a>
                        <a href=""><img src={logo3} alt="lien pour aller sur instagram" /></a>
                        <a href=""><img src={logo4} alt="lien pour aller sur reddit" /></a>
                        <a href=""><img src={logo5} alt="lien pour aller sur twitter" /></a>
                    </div>
                </div>
                         <ul className={styles.ul}>
                            <li className="mb20">Contact</li>
                            <li><a title="lien vers votre boite email pour nous contacter" className={styles.a} href="mailto:W3learn.w3@gmail.com" target="_blank">W3learn.w3@gmail.com</a></li>
                        </ul>
                        <ul className={styles.ul}>
                            <li className="mb20">Mentions légales</li>
                            <li><NavLink to="/termes" title="lien vers les termes et conditions" className={styles.a}>Termes et Conditions</NavLink></li>
                            <li><NavLink to="/termes" title="lien vers les politiques de confidentialité" className={styles.a}>Politique de confidentialité</NavLink></li>
                            <li><NavLink to="/termes" title="lien vers Conformité RGPD" className={styles.a}>Conformité RGPD</NavLink></li>
                            <li><NavLink to="/termes" title="lien vers le démenti" className={styles.a}>Démenti</NavLink></li>
                        </ul>
            </div>
                <div className={styles.bottomFooter}>
                <p>© 2023 W3 Learn.  Tous droits réservés.</p>
                </div>
        </footer>
    )
}