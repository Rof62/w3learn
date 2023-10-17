import styles from "../../sass/container.module.scss"
import anime1 from "../../img/anime.crypto1.gif"
import anime2 from "../../img/anime.crypto2.gif"
import anime3 from "../../img/anime.crypto3.gif"
import anime4 from "../../img/anime.crypto4.gif"
import anime5 from "../../img/securite.crypto.gif"

export default function crypto() {
    return(
        <>
        <div>
            <h1>CRYPTO</h1>
                <div className={`${styles.container}`}>
                    <div className="d-flex justify-content-around align-items-center container1Mobile container2Mobile mb20">
                        <h2>Introduction à <br /><br /> la Cryptomonnaie</h2>
                            <p>
                                La cryptomonnaie est une forme de monnaie numérique basée sur la technologie de la cryptographie.
                                Contrairement aux monnaies traditionnelles émises par les gouvernements, les cryptomonnaies sont 
                                décentralisées et fonctionnent sur des réseaux informatiques distribués appelés blockchains. 
                                La blockchain est un registre public et sécurisé qui enregistre toutes les transactions effectuées 
                                avec la cryptomonnaie. La première cryptomonnaie, le Bitcoin, a été introduite en 2009 par une personne 
                                ou un groupe sous le pseudonyme de Satoshi Nakamoto. Depuis lors, de nombreuses autres cryptomonnaies ont
                                vu le jour, chacune avec ses caractéristiques et ses objectifs spécifiques.
                            </p>
                        <img style={{ width: "150px", height: "150px"}} src={anime1} alt="GIF animé" />
                    </div>
                </div>
                <div className={`${styles.container}`}>
                    <h2>Fonctionnement des Cryptomonnaies</h2>
                        <div>
                            <div className="d-flex justify-content-between ">
                                <img style={{ width: "150px", height: "150px"}} src={anime2} alt="GIF animé" />
                                <img style={{ width: "150px", height: "150px"}} src={anime2} alt="GIF animé" />
                            </div>
                            <div className="d-flex resume size container3 mb20">
                                <p>
                                    Les cryptomonnaies fonctionnent grâce à une combinaison de concepts de cryptographie, de mathématiques 
                                    et de technologie blockchain . Chaque cryptomonnaie a sa propre architecture et son propre mécanisme de 
                                    consensus pour valider les transactions. L'un des exemples les plus célèbres est le Bitcoin, qui 
                                    utilise le mécanisme de preuve de travail (Proof of Work) pour sécuriser son réseau.
                                </p>
                            </div>
                            <div className="custom "></div>
                            <div className="d-flex justify-content-around align-items-center container3 container1Mobile mb20">
                                    <br />
                                <p>
                                    <span>Les transactions :</span>
                                    <br /><br />
                                    Les transactions cryptomonnaies consistent en l'envoi de fonds d'un portefeuille à un autre.
                                    Lorsqu'un utilisateur effectue une transaction, elle est diffusée à travers le réseau et regroupée
                                    avec d'autres transactions dans un bloc. Les mineurs, qui sont des participants du réseau, 
                                    compétitionnent pour résoudre un problème cryptographique complexe. Le premier mineur à résoudre ce 
                                    problème ajoute le bloc de transactions à la blockchain et reçoit une récompense en cryptomonnaie 
                                    pour ses efforts. Cette récompense, appelée "block reward", est à la fois une incitation pour les 
                                    mineurs à sécuriser le réseau et à ajouter de nouvelles transactions.
                                </p> 
                                <img style={{ width: "150px", height: "150px"}} src={anime3} alt="GIF animé"/>                     
                                    <br />
                            </div>
                            <div className="custom"></div>
                            <div className="d-flex justify-content-around align-items-center container3 container3Mobile mb20">
                                <img style={{ width: "150px", height: "150px"}} src={anime5} alt="GIF animé"/>
                                <p>
                                    <span>La securité :</span>
                                    <br /><br />
                                    La sécurité de la cryptomonnaie repose sur la cryptographie. Chaque portefeuille est associé à une 
                                    paire de clés : une clé privée et une clé publique. La clé privée est secrète et permet de signer des 
                                    transactions, tandis que la clé publique agit comme une adresse à laquelle d'autres utilisateurs peuvent envoyer des fonds. Lorsqu'une transaction est signée avec la clé privée, elle est cryptée et ajoutée à la blockchain. La vérification des signatures cryptographiques garantit l'intégrité et l'authenticité des transactions.
                                    Enfin, il est important de noter que les cryptomonnaies ne sont pas émises par une autorité centrale,
                                    contrairement aux monnaies traditionnelles. Au lieu de cela, de nouvelles unités de cryptomonnaie sont
                                    créées selon un calendrier préétabli ou par le processus de minage. Cette absence de contrôle 
                                    centralisé a des implications pour la politique monétaire, la création de valeur et l'inflation.
                                </p>                                                         
                            </div>
                        </div>
                </div>
                <div className={`${styles.container}`}>
                    <h2>Utilisations et Impact des Cryptomonnaies</h2>
                        <div className="d-flex justify-content-around align-items-center container3 container1Mobile">
                            <p>
                                Les cryptomonnaies ont un impact majeur sur divers domaines, notamment les services financiers, 
                                la technologie et l'économie. Elles permettent des transactions rapides et peu coûteuses à l'échelle 
                                mondiale, éliminant la nécessité d'intermédiaires financiers traditionnels. De plus, les cryptomonnaies 
                                permettent l'inclusion financière pour les personnes non bancarisées dans le monde entier. Les
                                "smart contracts" (contrats intelligents) basés sur les cryptomonnaies sont des programmes 
                                informatiques autonomes qui exécutent automatiquement des conditions contractuelles prédéfinies. 
                                Cela a des implications majeures pour l'automatisation de divers processus commerciaux. 
                            <br /><br />
                                L'essor des cryptomonnaies a également soulevé des questions sur la régulation, la sécurité et la 
                                volatilité des marchés. Les investisseurs et les entreprises ont cherché à exploiter les opportunités 
                                tout en naviguant dans un environnement en constante évolution. Enfin, les discussions sur la 
                                cryptomonnaie vont au-delà des aspects financiers, touchant des domaines tels que la gouvernance,
                                la protection de la vie privée et les évolutions technologiques.
                            </p>
                            <div className="d-flex  align-items-center mb20">
                            <img style={{ width: "150px", height: "150px"}} src={anime4} alt="GIF animé" />
                            </div>
                        </div>
                </div>
        </div>
        </>
    )
}