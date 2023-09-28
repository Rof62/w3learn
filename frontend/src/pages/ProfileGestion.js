import { useState } from "react";
// import ImageUploadForm from '../components/ImageUploadForm';
import ProfileImage from "../components/ProfileImage";
import AddProjet from "../components/AddProjet";

export default function ProfileGestion({ user }) {

    console.log(user);
    

    const handleImageUpload = async (idUsers, imageFile) => {
      const formData = new FormData();
      formData.append('profileImage', imageFile);
      formData.append('idUsers', idUsers);
  
      try {
        const response = await fetch('http://localhost:8003/api/profileImage/uploadImage', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          console.log('Image téléchargée avec succès.');
          // Mettez à jour l'utilisateur avec les nouvelles données, si nécessaire
        } else {
          console.error('Échec du téléchargement de l\'image.');
        }
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image :', error);
      }
    };

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);

    const modifyName = async (newUsername) => {
      console.log({newUsername});
      try {
      console.log("TEST STOP PROPAGATION");

        const response = await fetch("http://localhost:8003/api/gestionProfile/updateUsername", {
          method: "PATCH",
          body: JSON.stringify( newUsername ),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const newUser = await response.json()
          console.log("username", newUser);
          setUsername(newUser.username)
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function modifyEmail(newEmail) {
      try {
        const response = await fetch("http://localhost:8003/api/gestionProfile/updateEmail", {
          method: "PATCH",
          body: JSON.stringify(newEmail),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const newUser = await response.json()
          console.log("email", newUser);
          setEmail(newUser.email)
        }
      } catch (error) {
        console.error(error);
      }
    }
 
    async function modifyPassword(newPassword) {
      try {
        const response = await fetch("http://localhost:8003/api/gestionProfile/updatePassword", {
          method: "PATCH",
          body: JSON.stringify({ idUsers: user.idUsers, password: newPassword }),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const result = await response.json();
          if (result.message === "Mot de passe mis à jour avec succès") {
            // Mise à jour réussie
            console.log("Mot de passe mis à jour avec succès !");
            // Vous pouvez mettre à jour l'état local de l'utilisateur ici si nécessaire
            setPassword(user.password)
          } else {
            console.error("La mise à jour du mot de passe a échoué :", result.message);
          }
        } else {
          console.error("Échec de la mise à jour du mot de passe.");
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du mot de passe :", error);
      }
    }

    async function handleDeleteUser(deletedUser) {
      try {
        const response = await fetch("http://localhost:8003/api/gestionProfile/deleteUser", {
          method: "DELETE",
          body: JSON.stringify(deletedUser),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    function handleChange(e) {
      const value = e.target.value;
      setUsername(value);
    }
    
    const handleClick = () => {
      if (username.length) {
        modifyName({ ...user, username: username });
      }
    };
  
    const handleKeyDown = (e) => {
      if (e.code === "Enter" && username.length) {
        modifyName({ ...user, username: username });
      } 
    };

    function handleChange2(e) {
      const value = e.target.value;
      setEmail(value);
    }
  
    const handleClick2 = () => {
      if (email.length) {
        modifyEmail({ ...user, email: email });
      }
    };
  
    const handleKeyDown2 = (e) => {
      if (e.code === "Enter" && email.length) {
        modifyEmail({ ...user, email: email });
      } 
    };

    function handleChange3(e) {
      const value = e.target.value;
      setPassword(value);
    }
  
    const handleClick3 = () => {
      if (password.length) {
        modifyPassword({ ...user, password: password });
      }
    };
  
    const handleKeyDown3 = (e) => {
      if (e.code === "Enter" && password.length) {
        modifyPassword({ ...user, password: password });
      } 
    };
    console.log(user);
    return(
        <div className="d-flex align-items-center flex-column  mb20 mt20">
            <h1>Gestion de profile</h1>
            <div className="cards">
              <div className="d-flex flex-column justify-content-center align-items-center mt20">
                <h3>Bienvenue {user.username} </h3>
                <>
                <ProfileImage className="mt20" user={user}/>
                </>
                
              </div>
              <div className="gestion2 ">
              <div className="d-flex justify-content-between align-items-center gestion">
                <p className="ml20">Votre password :</p>
                <input
                    type="password"
                    onChange={handleChange3}
                    onKeyDown={handleKeyDown3}
                    value={password}
                    className="p10"
                    
                />
                
                <button onClick={handleClick3} className="btn btn-primary mr20">
                    Modifier
                </button>
              </div> 
              <div className="d-flex justify-content-between align-items-center gestion">
                <p className="ml20">Votre pseudo :</p>
                <input
                    type="name"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    // value={username}
                    className="p10"
                    
                />
                
                <button onClick={handleClick} className="btn btn-primary mr20">
                    Modifier
                </button>
              </div> 
              <div className="d-flex justify-content-between align-items-center gestion">
                <p className="ml20">Votre email :</p>
                <input
                    type="email"
                    onChange={handleChange2}
                    onKeyDown={handleKeyDown2}
                    value={email}
                    className="p10"
                    
                />
                
                <button onClick={handleClick2} className="btn btn-primary mr20">
                    Modifier
                </button>
                </div>
              </div> 
              <>
            <AddProjet />
            </> 
            </div>
            
        </div>
    )
}