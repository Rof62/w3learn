import logo from "../img/logo.png"
import styles from "../sass/Navbar.module.scss"



export default function navbar() {
    return(
        <div className={`d-flex justify-content-around align-items-center  ${styles.navbar}`}>
            <img src={logo} alt="" />
            <ul className="d-flex align-items-center justify-content-between">
                <li>BLOCKCHAIN</li>
                <li>CRYPTO</li>
                <li>NFT</li>
                <li>METAVERVE</li>
                <li>BLOG/ACTU</li>
            </ul>
            <button className=" btn btn-primary-reverse">Se connecter</button>
        </div>
    );
}