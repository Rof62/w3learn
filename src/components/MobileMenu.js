import { NavLink } from "react-router-dom";
import styles from "../sass/MobileMenu.module.scss"


export default function MobileMenu( {showMenu, closeMenu}) {
    
    const handleNavLinkClick = () => {
        closeMenu()
    }

    return (
        <div className={`d-flex justify-content-center flex-column align-items-center  p20 ${styles.menuContainer}`}>
        <i onClick={handleNavLinkClick} className={`fa-solid fa-xmark  mr10 ${styles.burger2}`}></i>
        <ul className={`d-flex justify-content-center flex-column align-items-center  p20 ${styles.menuContainer}`}>
            <li ><NavLink to="/blockchain" className={`${styles.none}`} onClick={handleNavLinkClick}>BLOCKCHAIN</NavLink></li>
            <li><NavLink to="/crypto" className={`${styles.none}`} onClick={handleNavLinkClick}>CRYPTO</NavLink></li>
            <li><NavLink to="/nft" className={`${styles.none}`} onClick={handleNavLinkClick}>NFT</NavLink></li>        
            <li><NavLink to="/metaverse" className={`${styles.none}`} onClick={handleNavLinkClick}>METAVERSE</NavLink></li>        
            <li>BLOG/ACTU</li>
            <li>Connexion</li>
        </ul>
        </div>
    )
}