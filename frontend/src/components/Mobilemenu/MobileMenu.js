import { NavLink } from "react-router-dom";
import styles from "./MobileMenu.module.scss"
import {useState, useContext} from "react"
import {AuthContext} from "../../context"
import {logout} from "../../api/users"


export default function MobileMenu( {showMenu, closeMenu}) {

    const {user} = useContext(AuthContext)
    const {setUser} = useContext(AuthContext)

    function deconnexion() {
    
        setUser(null)
        logout()
      }
    
    const handleNavLinkClick = () => {
        closeMenu()
    }

    return (
        <div className={`d-flex justify-content-center flex-column align-items-center  p20 ${styles.menuContainer}`}>
        <i onClick={handleNavLinkClick} className={`fa-solid fa-xmark  mr10 ${styles.burger2}`}></i>
        <ul className={`d-flex justify-content-center flex-column align-items-center  p20 ${styles.menuContainer}`}>
            <li ><NavLink to="/blockchain" onClick={handleNavLinkClick}>BLOCKCHAIN</NavLink></li>
            <li><NavLink to="/crypto" onClick={handleNavLinkClick}>CRYPTO</NavLink></li>
            <li><NavLink to="/nft" onClick={handleNavLinkClick}>NFT</NavLink></li>        
            <li><NavLink to="/metaverse" onClick={handleNavLinkClick}>METAVERSE</NavLink></li>        
            <li><NavLink to="/blog" onClick={handleNavLinkClick}>BLOG</NavLink></li>
            <div>
                { user ? (
                    <>
                    
                    <li onClick={deconnexion} ><NavLink to="/" className={`${styles.none}`} onClick={handleNavLinkClick}>Deconnexion</NavLink></li>
                    </>
                ) : (
                    <>
                    <li><NavLink to="/inscription" className={`${styles.none}`} onClick={handleNavLinkClick}>Inscription</NavLink></li>
                    <li><NavLink to="/connexion" className={`${styles.none}`} onClick={handleNavLinkClick}>connexion</NavLink></li></>
                ) }
            
            </div>
            {/* <li><NavLink to="/connexion" className={`${styles.none}`} onClick={handleNavLinkClick}>Connexion</NavLink></li>
            <li><NavLink to="/inscription" className={`${styles.none}`} onClick={handleNavLinkClick}>Inscription</NavLink></li> */}
        </ul>
        </div>
    )
}