import React, { useState } from 'react';

export default function ImageUploadForm({ user, onImageUpload }) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Veuillez sélectionner une image.');
      return;
    }

    const uploadedImageUrl = await onImageUpload(user.idUsers, image);

    setImageUrl(uploadedImageUrl);
  };

  return (
    <div>
      <p>Télécharger une image de profil</p>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Télécharger</button>
      </form>
      {image && <img src={imageUrl} alt="Image de profil" />}
    </div>
  );
}
