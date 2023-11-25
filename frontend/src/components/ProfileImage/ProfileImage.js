import styles from "../ProfileImage/ProfileImage.module.scss"
import {useState, useContext, useEffect} from "react"
import {AuthContext} from "../../context"

export default function ProfileImage({  }) {

  const {user} = useContext(AuthContext)
  // useState pour l'input de type file
  const [selectedFile, setSelectedFile] = useState(null);
// useState pour l'attribut src de notre balise img
  const [previewImage, setPreviewImage] = useState(null);
console.log({user});
  useEffect(() => {
    async function getDefaultImage() {
      let response;
      if (user.blobby ) {
        response = await fetch(
          `http://localhost:8003/api/profileImage/getAvatarFromUser?id=${user.idUsers}`
        );
      } else {
        response = await fetch(
          `http://localhost:8003/api/profileImage/getDefaultImage`
        );
      }
      console.log(user);
      const imgDefaultFromBack = await response.json();
      console.log({ imgDefaultFromBack });
      const uint8Array = new Uint8Array(imgDefaultFromBack.blobby.data);
      console.log({ uint8Array });
      const blob = new Blob([uint8Array]);
      console.log({ blob });
      const urlImage = URL.createObjectURL(blob);
      console.log({ urlImage });
      fetch(urlImage)
        .then((response) => response.text())
        .then((text) => {
          console.log({ text });
          setPreviewImage(text);
        });
    }
    getDefaultImage();
  }, [user]);

  // déclaration de la fonction lors d'un changement de fichier dans l'input avant validation
  function handleChange(event) {
    // récupération du fichier
    const file = event.target.files[0];
    setSelectedFile(file);
    // on place une condition pour l'attribuer à l'attribut src de la balise img ou non
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setPreviewImage(fileReader.result);
      };
    } else {
      setPreviewImage(null);
    }
  }

  // déclaration de la fonction qui récupére un obket blob, le lit et le convertir en
  // une chaine de caractères base64 qui permet de coder tout tupe de données
  // une fois la promesse résolue, si aucune erreur n'a été rencontré, le fichier est codé et renvoyé
  // en retour de la fonction
  const convertBlobTobase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (!selectedFile) {
      alert("Veuillez sélectionner un fichier");
      return;
    }
    // FileReader permet de lire les fichiers de type File ou Blob
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(selectedFile);
    fileReader.onload = async () => {
      // récupération du fichier lu
      const buffer = fileReader.result;
      // création un objet blob à partir du fichier lu et du type de fichier
      const blob = new Blob([buffer], { type: selectedFile.type });
      console.log(selectedFile);

      // invocation de la fonction en passant en paramètre l'objet blob
      const base64 = await convertBlobTobase64(blob);
      console.log({ base64 });

      // création d'un objet avec blob et idUser
      const obj = { value: base64, idUsers: user.idUsers };

      // fetch
      const response = await fetch(
        "http://localhost:8003/api/profileImage/insertImage",
        {
          method: "PATCH",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const userModified = await response.json();
      const uint8Array = new Uint8Array(userModified.blobby.data);
      const blob2 = new Blob([uint8Array]);
      const urlImage = URL.createObjectURL(blob2);
      fetch(urlImage)
        .then((response) => response.text())
        .then((text) => {
          setPreviewImage(text);
        })
        .catch((err) => console.error(err));
    };
  }


  return (
    <div>
      {previewImage && (
        <div className="d-flex justify-content-center">
          <img src={previewImage} alt="avatar" style={{
            width: "200px",
            padding: "20px",
            border: "1px solid black",
            marginTop: "30px",
            borderRadius: "50%"
          }}
            />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="d-flex justify-content-center align-items-center"
      >
        <div >
        <label className="d-flex justify-content-center align-items-center"> 
          <input className=" " type="file" onChange={handleChange} />
        </label>
        <div className="d-flex justify-content-center ">
          <button className="btn btn-primary ">Sauvegarder</button>
          </div>
        </div>
      </form>
      {/* <div className="custom2"></div> */}
    </div>
    
  );
}

