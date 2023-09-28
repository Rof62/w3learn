import React, { useState, useEffect } from "react";

function ProfileImage({user}) {
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const idUsers = user.idUsers;

    // Effectuer la requête pour récupérer l'image de profil
    fetch(`/api/profileImage/profileImage/${idUsers}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de l'image de profil.");
        }
        return response.blob();
      })
      .then((imageBlob) => {
        // Convertir le blob en URL d'image
        const imageUrl = URL.createObjectURL(imageBlob);
        setProfileImage(imageUrl);
      })
      .catch((error) => {
        setError(error.message);
      });

    // Nettoyer l'URL de l'image lorsque le composant est démonté
    return () => {
      if (profileImage) {
        console.log(profileImage);
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [user.idUsers]);

  if (error) {
    return <div>Une erreur s'est produite : {error}</div>;
  }

  if (!profileImage) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      <img style={{ width: "150px", height: "150px"}}  src={profileImage} alt="Image de profil" />
    </div>
  );
}

export default ProfileImage;