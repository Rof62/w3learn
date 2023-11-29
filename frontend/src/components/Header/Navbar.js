import logo from "../../img/logo.png";
import logo2 from "../../img/profile-fill.png";
import logo3 from "../../img/Admin.png";
import styles from "./Navbar.module.scss";
import MobileMenu from "../Mobilemenu/MobileMenu";
import { NavLink } from "react-router-dom";
import {useState, useContext} from "react"
import {AuthContext} from "../../context"
import {logout} from "../../api/users"

export default function Navbar({ }) {

    const {user} = useContext(AuthContext)
    const {setUser} = useContext(AuthContext)
    const [showMenu, setShowMenu] = useState(false)

    function deconnexion() {
    
        setUser(null)
        logout()
      }

    const closeMenu = () => {
        setShowMenu(false)
    }

    return(
        <div className={`d-flex justify-content-around align-items-center   ${styles.navbar}`}>      
                 
            
            <ul className={`d-flex align-items-center justify-content-between ${styles.neon}`}>
            <NavLink to="/" ><img src={logo} alt="" className={`${styles.logo}`} /></NavLink>  
                <li><NavLink to="/blockchain" className={`${styles.none}`}>BLOCKCHAIN</NavLink></li>
                <li><NavLink to="/crypto" className={`${styles.none}`}>CRYPTO</NavLink></li>
                <li><NavLink to="/nft" className={`${styles.none}`}>NFT</NavLink></li>
                <li><NavLink to="/metaverse" className={`${styles.none}`}>METAVERSE</NavLink></li>
                <li><NavLink to="/blog" className={`${styles.none}`}>BLOG</NavLink></li>
            </ul>
            <div>
                { user ? (

                    <>
                    <div>
                    {user.role === 1 && ( // Vérification du rôle admin
                        <NavLink to="/Admin">
                        <img src={logo3} alt="Admin" className={`${styles.logo3}`} />
                        </NavLink>
                    )}
                    </div>
                    <NavLink to="/profileGestion" ><img src={logo2} alt="" className={`${styles.logo2}`} /></NavLink> 
                    <button onClick={deconnexion} className={` btn btn-primary-reverse m5 ${styles.button2}`}><NavLink to="/" className={`${styles.button}`}>Deconnexion</NavLink></button>
                    </>
                ) : (
                    <>
                    <button className={` btn btn-primary-reverse m5 ${styles.button}`}><NavLink to="/inscription" className={`${styles.button}`}>Inscription</NavLink></button>
                    <button className={` btn btn-primary-reverse m5 ${styles.button}`}><NavLink to="/connexion" className={`${styles.button}`}>connexion</NavLink></button></>
                ) }
            
            </div>
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
