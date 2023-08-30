import anime1 from "../img/anime.home1.gif";

export default function Home() {
    return(
        <div>
            <h1>WEB 3</h1>
                <div className="">
                    <h2> Qu'est-ce que le Web 3.0 ?</h2>
                        <div>
                            <p>Le Web 3.0, également appelé "Web sémantique", est la prochaine évolution du World Wide
                               Web qui vise à transformer l'expérience en ligne en utilisant des technologies avancées 
                               et des protocoles décentralisés. Contrairement au Web 2.0, où la plupart des données sont
                               statiques et stockées sur des serveurs centralisés, le Web 3.0 est caractérisé par une architecture
                               distribuée et décentralisée. Cela signifie que les utilisateurs ont un contrôle accru sur leurs données
                               et peuvent interagir avec des applications décentralisées (dApps) sans l'intermédiaire d'entités centrales.
                            </p>
                            <img style={{ width: "150px", height: "150px"}} src={anime1} alt="GIF animé" />
                        </div>
                </div>
        </div>
    );
}