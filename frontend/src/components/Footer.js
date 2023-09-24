import styles from "../sass/Footer.module.scss"
import logo from "../img/logo.png"
// import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
    return(
        <div className={`${styles.footer}`}>
            <NavLink to="/home" ><img src={logo} alt="" className={`${styles.logo}`} /></NavLink> 

        </div>
    )
}