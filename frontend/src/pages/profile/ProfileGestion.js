
// import ImageUploadForm from '../components/ImageUploadForm';
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import AddProjet from "../../components/AddProjet/AddProjet";
import image1 from "../../img/utopia1.png";
import styles from "../profile/ProfileGestion.module.scss"
import Contributeur from "../../components/Contributeur/Contributeur";
import {useState, useContext} from "react"
import {AuthContext} from "../../context"

export default function ProfileGestion({ }) {

  const {user, setUser} = useContext(AuthContext)

    console.log(user);
    

    const [ isEditUsername, setIsEditUsername ] = useState(false);
    const [ isEditEmail, setIsEditEmail ] = useState(false);
    const [ candidat, setCandidat ] = useState(user);
    

    const modifyUsername = async (newUsername) => {
      console.log({newUsername});
      try {
      console.log("TEST STOP PROPAGATION");

        const response = await fetch("http://localhost:8003/api/gestionProfile/updateUsername", {
          method: "PATCH",
          body: JSON.stringify( {username: newUsername, idUsers: user.idUsers}),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const newUser = await response.json()
          console.log("username", newUser);
          setUser(newUser.user)
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function modifyEmail(newEmail) {
      try {
        const response = await fetch("http://localhost:8003/api/gestionProfile/updateEmail", {
          method: "PATCH",
          body: JSON.stringify({email: newEmail, idUsers: user.idUsers}),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const newUser = await response.json()
          console.log("email", newUser);
          setUser(newUser.user)
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    const editingUsername = () => {
      setIsEditUsername(true);
    };
  
    const cancelEditingUsername = () => {
      setIsEditUsername(false);
      setCandidat({
        ...candidat,
        username: user.username
      });
    };
  
    const updateUsername = (e) => {
      setCandidat({
        ...candidat,
        username: e.target.value
      });
    };
  
    const saveNewUsername = () => {
      setUser(candidat);
      modifyUsername(candidat.username)
      setIsEditUsername(false);
    };
  
    const editingEmail = () => {
      setIsEditEmail(true);
    };
  
    const cancelEditingEmail = () => {
      setIsEditEmail(false);
      setCandidat({
        ...candidat,
        email: user.email
      });
    };
  
    const updateEmail = (e) => {
      setCandidat({
        ...candidat,
        email: e.target.value
      });
    };
  
    const saveNewEmail = () => {
      setUser(candidat);
      modifyEmail(candidat.email)
      setIsEditEmail(false);
    };
    
    console.log(user);
    return(
        <div className="d-flex align-items-center flex-column  mb20 mt20 ">
            <h1>Gestion de profile</h1>
            <div className="cards">
              <div className="d-flex flex-column justify-content-center align-items-center mt20">
                <h3>Bienvenue {user.username} </h3> 
                <>
                <ProfileImage className="mt20" user={user} />
                </> 
              </div>
              <div className="gestion2 ">
              <>
              { isEditEmail ? (
              <div className={`d-flex align-items-center justify-content-center mb20 ${styles.column}`} >
                <input onChange={ updateEmail } className="ml20 mb10" value={ candidat.email } />
                <button onClick={ saveNewEmail } className="ml20 btn btn-primary ">Sauvegarder</button>
                <button onClick={ cancelEditingEmail } className="ml20 btn btn-primary ">Annuler</button>
              </div >
               ) : (
              <div className={`d-flex align-items-center justify-content-center mb20 ${styles.column}`}>
                <h5 className="ml20 mb10">Email : { user.email }</h5>
                <button onClick={ editingEmail } className="ml20 btn btn-primary">Modifier</button>
              </div >
               )
              }
            </> 
            <>
             { isEditUsername ? (
              <div className={`d-flex align-items-center justify-content-center mb20 ${styles.column}`} >
                <input onChange={ updateUsername } className="ml20 mb10" value={ candidat.username } />
                <button onClick={ saveNewUsername } className="ml20 btn btn-primary">Sauvegarder</button>
                <button onClick={ cancelEditingUsername } className="ml20 btn btn-primary ">Annuler</button>
              </div >
              ) : (
              <div className={`d-flex align-items-center justify-content-center mb20 ${styles.column}`} >
                <h5 className="ml20 mb10">username : { user.username }</h5>
                <button onClick={ editingUsername } className="ml20 btn btn-primary">Modifier</button>
              </div >
              )
              } 
            </>
              <div className="custom2"></div>
              <div>
                <Contributeur user={user}/>
              </div> 
              <div className="custom2"></div>
              <>
              <div >
                <div className={`d-flex justify-content-center ${styles.contributeur}`}>
                  <h2>Ajouter un projet pour contribuer au Blog</h2>
                </div>
                <div className="d-flex justify-content-around align-items-center">
                  <AddProjet user={user}/>
                  <img className={`${styles.avatar}`} src={image1} alt="GIF animé" />
                </div>
              </div>
              <div className="custom2"></div>
              <div className={`d-flex justify-content-center mb20 ${styles.delete}`}>
                <h3>Supprimer mon compte</h3>
                <button className="btn btn-primary ml20 button">Supprimer</button>
              </div>
            </> 
            </div>   
          </div>
        </div> 
    )
}