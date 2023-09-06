import styles from "../sass/container.module.scss"
import anime1 from "../img/anime.blockchain1.gif"
import anime2 from "../img/anime.blockchain2.gif"

export default function blockchain() {
    return(
        <>
        <div>
            <h1>BLOCKCHAIN</h1>
                <div className={` ${styles.container}`}>
                    <div className="d-flex justify-content-around align-items-center container1Mobile">
                        <h2> Introduction à <br /><br /> la Technologie</h2>
                            <p>
                                La blockchain est une avancée majeure dans le domaine de la technologie qui a vu le jour avec l'avènement 
                                des cryptomonnaies, en particulier le Bitcoin. À sa base, la blockchain est un registre numérique distribué 
                                et sécurisé qui enregistre des transactions de manière transparente. Plutôt que de dépendre d'une entité
                                centrale pour vérifier les transactions, la blockchain permet à un réseau décentralisé de participants 
                                de collaborer à la validation des transactions. Ce système d'autorisation partagée élimine la nécessité 
                                d'intermédiaires de confiance, révolutionnant ainsi la manière dont nous traitons les échanges de valeur.
                            </p>
                        <img style={{ width: "150px", height: "150px"}} src={anime1} alt="GIF animé" />
                    </div>
                </div>
                <div className={`${styles.container}`}>
                    <h2>Principes de Base de la Technologie</h2>
                    <div className="container2">
                        <div className="d-flex justify-content-around align-items-center">
                        <img style={{ width: "150px", height: "150px"}} src={anime1} alt="GIF animé" />
                            <p>
                                <span>La blockchain tire son nom <br /> de sa structure fondamentale :</span>
                                <br /><br />
                                une chaîne de blocs. Chaque bloc contient un ensemble de transactions et un horodatage. De plus, chaque 
                                bloc est cryptographiquement lié au bloc précédent à l'aide d'une empreinte numérique unique 
                                appelée hachage. Cette connexion sécurisée crée une séquence immuable de blocs, formant ainsi une chaîne.
                                Cette conception cryptographique rend la blockchain extrêmement sécurisée, car la modification d'un 
                                seul bloc nécessiterait la modification de tous les blocs ultérieurs, ce qui est pratiquement impossible
                                en raison de la puissance de calcul nécessaire.
                            </p>
                        </div>
                        <div className="d-flex justify-content-around align-items-center">
                            <p>
                                <br /><br />
                                Le mécanisme de consensus est au cœur du fonctionnement de la blockchain. Il s'agit d'un processus par
                                lequel les participants du réseau parviennent à un accord sur l'ajout de nouveaux blocs à la chaîne. 
                                Dans le cas du Bitcoin, par exemple, le processus de preuve de travail (Proof of Work) est utilisé. 
                                Les mineurs résolvent des problèmes mathématiques complexes pour valider les transactions et ajouter
                                des blocs à la chaîne. Ce processus garantit que tous les participants conviennent de l'ordre et
                                de la validité des transactions.
                            </p>
                            <img style={{ width: "150px", height: "150px"}} src={anime1} alt="GIF animé" />
                        </div>
                    </div>
                </div>
                <div className={`${styles.container}`}>
                    <h2>Applications et Avantages de la Technologie</h2>
                    <div className="size  ">
                        <p> 
                            <span>Le potentiel :</span>
                            <br /><br />
                            Au-delà des cryptomonnaies, la blockchain offre un potentiel considérable dans divers domaines. Dans le secteur 
                            de la chaîne d'approvisionnement, elle peut être utilisée pour suivre le parcours des produits depuis leur
                            fabrication jusqu'à leur livraison, offrant ainsi une transparence totale et permettant de détecter rapidement 
                            les problèmes. Les registres fonciers basés sur la blockchain peuvent révolutionner la gestion de la propriété
                            en garantissant l'intégrité des enregistrements et en éliminant les litiges.
                            Les systèmes de vote électronique basés sur la blockchain peuvent améliorer la sécurité et
                            la fiabilité des élections en évitant la fraude.
                        </p>
                        </div>
                        <br />
                        <div className=" d-flex justify-content-around align-items-center container2">
                        <img style={{ width: "150px", height: "150px"}} src={anime2} alt="GIF animé" />
                        <p> 
                            <span>Les avantages :</span>
                            <br /><br />
                            Les avantages de la blockchain sont nombreux. La sécurité est renforcée grâce à la cryptographie avancée, 
                            rendant les transactions quasi impossibles à altérer. La décentralisation élimine le besoin d'intermédiaires
                            coûteux et réduit les risques de défaillance d'une entité centrale. La transparence inhérente de la blockchain
                            permet à tous les participants de vérifier les transactions, renforçant la confiance. Enfin, l'immuabilité 
                            de la blockchain empêche la manipulation des données historiques, ce qui peut être essentiel dans des domaines 
                            tels que l'historique médical ou les contrats intelligents.
                        </p>               
                        
                        </div>
                </div>

        </div>
        </>
    )
}