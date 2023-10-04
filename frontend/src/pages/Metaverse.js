import styles from "../sass/container.module.scss"
import anime1 from '../img/anime.metaverse1.gif'
import anime2 from '../img/anime.metaverse2.gif'
import img1 from '../img/img.meta1.png'
import img2 from '../img/img.meta2.png'

export default function Metaverse() {
    return(
        <div>
            <h1>METAVERSE</h1>
                <div className={` ${styles.container}`}>
                    <div className="d-flex justify-content-around align-items-center container1Mobile container2Mobile mb20">
                        <h2> Introduction <br /><br />au Métaverse</h2>
                            <p>
                                Le métaverse est un concept en plein essor qui englobe un environnement numérique tridimensionnel 
                                où les utilisateurs peuvent interagir, créer, socialiser et mener des activités similaires à celles 
                                du monde réel. Il s'agit d'une convergence de mondes virtuels, de réalité virtuelle, de réalité augmentée
                                et d'Internet, créant un espace numérique immersif et interactif. Inspiré par la science-fiction, 
                                le métaverse vise à transcender les limites physiques et à permettre aux individus de vivre des
                                expériences numériques immersives et collaboratives.
                            </p>
                            <img style={{ width: "150px", height: "150px"}} src={anime1} alt="GIF animé" />
                    </div>
                </div>
                <div className={` ${styles.container}`}>
                    <h2>Caractéristiques et Composants du Métaverse</h2>
                        <div className="d-flex justify-content-around align-items-center container3 container1Mobile mt20 mb20">
                            <p>
                                Le métaverse est caractérisé par plusieurs composants clés qui le distinguent des expériences en 
                                ligne traditionnelles. Tout d'abord, il offre une interactivité en temps réel, permettant aux 
                                utilisateurs d'interagir les uns avec les autres et avec l'environnement numérique de manière fluide.
                                Les environnements du métaverse sont tridimensionnels, ce qui signifie que les utilisateurs peuvent 
                                se déplacer, explorer et interagir avec des objets dans un espace virtuel. Les éléments du monde réel
                                peuvent être intégrés via la réalité augmentée, tandis que les mondes virtuels peuvent être créés à
                                partir de zéro.
                            </p>
                                <img style={{ width: "150px", height: "150px"}} src={anime2} alt="GIF animé" />
                        </div>
                        <div className="custom "></div>
                        <div className="d-flex resume size container3 mb20 mt20">
                            <p>
                                Les économies virtuelles jouent également un rôle important dans le métaverse. Les utilisateurs 
                                peuvent acheter, vendre et échanger des biens numériques, tels que des propriétés virtuelles, 
                                des objets de collection et des vêtements pour avatars, en utilisant des cryptomonnaies et des
                                tokens non-fongibles (NFT). Les interactions sociales sont au cœur du métaverse, avec des espaces 
                                pour se réunir, se socialiser, travailler ensemble et assister à des événements virtuels.
                            </p>
                        </div>
                </div>
                <div className={` ${styles.container}`}>
                    <h2>Applications et Implications du Métaverse</h2>
                        <div className="d-flex justify-content-around align-items-center container3 container1Mobile mt20 mb20">
                            <p>
                                Le métaverse offre un large éventail d'applications et d'implications dans divers domaines. Dans le secteur 
                                du divertissement, il permet aux utilisateurs de participer à des jeux vidéo immersifs, de regarder des concerts 
                                virtuels, de visionner des films en réalité virtuelle et de créer du contenu interactif. Les entreprises explorent
                                également le potentiel du métaverse pour les réunions virtuelles, la formation en réalité virtuelle, 
                                la conception collaborative et la vente au détail virtuelle. Les artistes et les créateurs de contenu utilisent 
                                le métaverse pour présenter et vendre des œuvres d'art numérique, des animations et d'autres créations.
                            </p>
                            <div>
                                <img style={{ width: "300px", height: "200px"}}  src={img1} alt=" Decentraland" />
                                    <div className="container3 d-flex justify-content-around align-items-center styleNone mb20">
                                        <li ><a href="https://decentraland.org/" target="-blank" >Decentraland</a></li>
                                    </div>
                                </div> 
                        </div>
                        <div className="custom "></div>
                        <div className="d-flex justify-content-around align-items-center container3 container3Mobile mb20 mt20">
                            <div>
                                <img style={{ width: "300px", height: "200px"}}  src={img2} alt=" Sandbox" />
                                    <div className="container3 d-flex justify-content-around align-items-center styleNone mb20">
                                        <li ><a href="https://www.sandbox.game/en/" target="-blank" >The Sandbox</a></li>
                                    </div>
                                </div>
                            <p>
                                Cependant, le métaverse soulève également des questions sur la vie privée, la sécurité, la régulation
                                et l'accès équitable. Alors que les interactions numériques deviennent plus intégrées à la vie
                                quotidienne, des préoccupations sur la dépendance technologique et la déconnexion de la réalité 
                                physique sont également soulevées. Le développement du métaverse nécessite une collaboration étroite
                                entre les entreprises, les innovateurs technologiques et les utilisateurs pour façonner un
                                environnement numérique qui soit à la fois innovant et éthique.
                            </p>
                        </div>
                </div>
        </div>
    )
}