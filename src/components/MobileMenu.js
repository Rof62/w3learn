import { NavLink } from "react-router-dom";
import styles from "../sass/MobileMenu.module.scss"


export default function MobileMenu() {
    
    return (
        <ul className={`d-flex justify-content-center flex-column align-items-center  p20 ${styles.menuContainer}`}>
            <li ><NavLink to="/blockchain" className={`${styles.none}`}>BLOCKCHAIN</NavLink></li>
            <li><NavLink to="/crypto" className={`${styles.none}`}>CRYPTO</NavLink></li>
                    <li>NFT</li>        
                    <li>METAVERSE</li>
            <li>BLOG/ACTU</li>
            <li>Connexion</li>
        </ul>
    )
}