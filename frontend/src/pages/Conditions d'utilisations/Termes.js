import styles from "./Termes.module.scss"

export default function Termes() {
    return(
        <div className={`${styles.card}`}>
            <div className={`${styles.article}`}>   
                <h2 className="d-flex justify-content-center mb20 ">Termes et Conditions d'utilisations</h2>
                    <h4>Clause de Responsabilité</h4>
                        <p className="p20">L'utilisation de ce site est soumise à l'acceptation des termes et conditions énoncés ci-dessous. En naviguant sur ce site, l'utilisateur accepte les conditions générales d'utilisation et s'engage à les respecter.</p>
                    <h4>Droits d'Utilisation</h4>
                        <p className="p20">Le contenu de ce site, incluant mais non limité aux articles, textes, images et médias, est protégé par les lois sur les droits d'auteur. Toute utilisation non autorisée du contenu peut constituer une violation des lois en vigueur.</p>
                    <h4>Contribution et Propriété des Contributions</h4>
                        <h5 className="p10">Soumissions de Contenu :</h5>
                            <p className="p20">En soumettant du contenu, tel que des articles, des projets ou des informations, vous acceptez de transférer les droits de propriété intellectuelle de ce contenu au site. Cela inclut le droit de publication, de modification, de distribution et d'utilisation du contenu à des fins liées au site.</p>
                        <h5 className="p10">Droits d'Auteur :</h5>
                            <p className="p20">Les contributeurs conservent généralement les droits d'auteur initiaux sur leur contenu. Cependant, en soumettant du contenu sur le site, vous accordez au site et à ses administrateurs le droit d'utiliser, de modifier et de diffuser ce contenu sans restriction.</p>
                       <h5 className="p10">Responsabilité de la Contribution :</h5>
                            <p className="p20">Toute contribution doit respecter les normes de qualité et d'éthique du site. Les contenus inappropriés, illégaux, diffamatoires, offensants ou violant les droits d'autrui ne seront pas acceptés.</p>
                        <h5 className="p10"> Propriété du Contenu Accepté :</h5>
                            <p className="p20"> Une fois que le contenu est accepté et publié sur le site, il devient la propriété du site. Les administrateurs du site se réservent le droit de modifier, supprimer ou mettre à jour le contenu à leur discrétion.</p>
                        <h5 className="p10">Accès à la Contribution :</h5>
                            <p className="p20">Les contributeurs acceptent que leurs contributions soient accessibles au public sur le site et peuvent être partagées sur les réseaux sociaux ou d'autres plateformes pour promouvoir le site.</p> 
                        <h5 className="p10">Consentement :</h5> 
                            <p className="p20">En soumettant du contenu sur le site, vous confirmez votre consentement et votre accord avec ces conditions et termes de propriété des contributions.</p> 
            </div>
            
            <div className={`${styles.article}`}>
                <h2 className="d-flex justify-content-center ">politique de confidentialité</h2>
                    <h5 className="p10">Collecte de Données :</h5>
                        <p className="p20">es informations personnelles collectées lors de l'inscription (telles que le nom, l'adresse e-mail) sont utilisées uniquement dans le cadre de l'utilisation du site et ne seront pas partagées avec des tiers sans consentement explicite.</p>
                    <h5 className="p10">Utilisation des Cookies :</h5>
                        <p className="p20">Ce site utilise des cookies pour améliorer l'expérience utilisateur. Ces cookies ne collectent pas d'informations personnelles identifiables et sont utilisés uniquement à des fins d'analyse et de personnalisation.</p>
                    <h5 className="p10">Sécurité des Données :</h5>
                        <p className="p20">Toutes les données personnelles collectées sont stockées de manière sécurisée et protégées contre tout accès non autorisé</p>
            </div>

            <div className={`${styles.article}`}>
                <h2 className="d-flex justify-content-center ">Conformité RGPD</h2>
                    <h5 className="p10">Droit à l'Information :</h5>
                        <p className="p20">Les utilisateurs ont le droit d'accéder aux données personnelles collectées et de demander des informations sur la manière dont ces données sont utilisées. </p>
                    <h5 className="p10">Consentement explicite :</h5>
                        <p className="p20">Les utilisateurs doivent donner leur consentement explicite pour la collecte et l'utilisation de leurs données personnelles avant de les soumettre sur le site.</p>
                    <h5 className="p10">Droit à l'Oubli :</h5>
                <p className="p20">Les utilisateurs ont le droit de demander la suppression de leurs données personnelles du site, conformément à la politique de confidentialité.</p>
            </div>

            <div className={`${styles.article}`}>
                <h2 className="d-flex justify-content-center ">Dementi</h2>
                    <h5 className="p10">Avertissement ! :</h5>
                        <p className="p20">Ce site et son contenu sont fournis à titre informatif uniquement et ne doivent en aucun cas être interprétés comme des conseils en investissement financier ou des recommandations pour effectuer des transactions.</p>
                    <h5 className="p10">Rôle Informatif :</h5>
                        <p className="p20">Les informations fournies sur ce site, y compris les articles, les analyses et les projets répertoriés, sont destinées à être des ressources éducatives sur le Web3. Elles ne constituent pas des conseils professionnels en matière d'investissement ou de finance.</p>
                    <h5 className="p10">Risque d'Investissement :</h5>
                        <p className="p20">Tout investissement ou décision financière effectuée sur la base des informations disponibles sur ce site relève de la responsabilité exclusive de l'utilisateur. Nous déclinons toute responsabilité pour les pertes ou dommages subis en raison de décisions prises en se basant sur le contenu de ce site.</p>
                    <h5 className="p10">Consultation Professionnelle :</h5>
                        <p className="p20">Il est fortement recommandé à l'utilisateur de consulter des professionnels qualifiés dans le domaine des investissements ou de la finance avant de prendre des décisions financières.</p>
                    <h5 className="p10">Limitation de Responsabilité :</h5>
                        <p className="p20">Nous déclinons toute responsabilité quant à l'exactitude, l'exhaustivité ou la pertinence des informations fournies sur ce site, ainsi que pour tout préjudice ou dommage résultant de leur utilisation.</p>
            </div>
            
        </div>
    )
}