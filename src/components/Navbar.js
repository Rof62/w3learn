import logo from "../img/logo.png"
import styles from "../sass/Navbar.module.scss"
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false)

    const closeMenu = () => {
        setShowMenu(false)
    }

    return(
        <div className={`d-flex justify-content-around align-items-center  ${styles.navbar}`}>      
                 
            
            <ul className={`d-flex align-items-center justify-content-between ${styles.neon}`}>
            <NavLink to="/home" ><img src={logo} alt="" className={`${styles.logo}`} /></NavLink>  
                <li><NavLink to="/blockchain" className={`${styles.none}`}>BLOCKCHAIN</NavLink></li>
                <li><NavLink to="/crypto" className={`${styles.none}`}>CRYPTO</NavLink></li>
                <li><NavLink to="/nft" className={`${styles.none}`}>NFT</NavLink></li>
                <li><NavLink to="/metaverse" className={`${styles.none}`}>METAVERSE</NavLink></li>
                <li>BLOG/ACTU</li>
            </ul>
            <button className=" btn btn-primary-reverse ">Se connecter</button>
            <>
         <i onClick={() => setShowMenu(true)} className={` fas fa-bars mr10 ${styles.burger}`}></i>
           
            { showMenu && (
                <> 
                <MobileMenu showMenu={showMenu} closeMenu={closeMenu}/>
                </>
            )}
        </>
           
        </div>
       
    );
}
