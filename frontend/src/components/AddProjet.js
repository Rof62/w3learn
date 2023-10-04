import styles from "../sass/Register.module.scss";
import React, { useState } from 'react';
import {  useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";


export default function AddProjet({user}) {

  const [feedback, setFeedBack] = useState("");
  const [feedbackGood, setFeedBackGood] = useState("");

  const navigate = useNavigate()
  
    const yupSchema = yup.object({
        name: yup
          .string()
          .required("Le champ est obligatoire")
          .min(2, "Le champ doit contenir au minimum 2 caractères")
          .max(12),
        year: yup
          .string()
          .required("Le champ est obligatoire")
          .min(4, "Le champ doit contenir au minimum 4 caractères")
          .max(4),
        description: yup
          .string()
          .required("Le champ est obligatoire"),
        link: yup
          .string()
          .required("Le champ est obligatoire"),
        
      });

      

  

const defaultValues = {
    name: "",
    year: "",
    description: "",
    validation: false,
    image: null,
    link: "",
    
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  async function submit(values) {
    setFeedBack("");
    try {

      if (!values.name || !values.year || !values.description || !values.link || !values.image) {
        setFeedBack("Veuillez remplir tous les champs.");
        return;
      }

      const imageBlob = await convertImageToBlob(values.image[0]);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("year", values.year);
      formData.append("description", values.description);
      formData.append("link", values.link);
      formData.append("image", imageBlob);
      formData.append("idUsers", user.idUsers);
      

      const response = await fetch("http://localhost:8003/api/profileImage/addProjet", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.message) {  
          setFeedBackGood(result.messageGood);
          setTimeout(() => { 
            reset(defaultValues);
            navigate("/ProfileGestion")
          }, 1500)
        } 
      } else {
        setFeedBack("Une erreur s'est produite lors de l'envoi du formulaire.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      setFeedBack("Une erreur s'est produite lors de l'envoi du formulaire.");
    }
  }

  // Fonction pour convertir l'image en Blob
  const convertImageToBlob = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(imageFile);
    });
  };


  return(
    <div className={`d-flex flex-column justify-content-center align-items-center ${styles.appContainer}`}>
        
        <form onSubmit={handleSubmit(submit)}  className={`d-flex align-items-center flex-column  p20 mb20`}>
        <div className="d-flex flex-column mb10">
          <label htmlFor="name" className="mb10 ml20">
            Nom du projet
          </label>
          <input placeholder="Nom du projet" className="p10" type="text" id="name" {...register("name")} />
          {errors?.name && (
            <p className={`${styles.feedback}`}>{errors.name.message}</p>
          )}
        </div>
        <div className={`d-flex flex-column mb10 `}>
          <label htmlFor="year" className="mb10 ml10 ">
            Année de création du projet
          </label >
          <div >
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
            <input
              placeholder="Année du projet"
              className="p10"
              type="number"
              id="year"
              {...field}
            />
              )}
          />
          </div>
          {errors?.year && (
            <p className={`${styles.feedback}`}>{errors.year.message}</p>
          )}
        </div>
        <div className={`d-flex flex-column mb10 ${styles.width} `}>
          <label htmlFor="description" className="mb10 ml10">
            Description du projet
          </label>
          <textarea placeholder="Description" className="p10" type="textarea" id="description" rows="10"  {...register("description")} />
          {errors?.description && (
            <p className={`${styles.feedback}`}>{errors.description.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb10">
          <label htmlFor="link" className="mb10 ml20">
            Lien du projet
          </label>
          <input placeholder="Link" className="p10" type="text" id="link" {...register("link")} />
          {errors?.link && (
            <p className={`${styles.feedback}`}>{errors.link.message}</p>
          )}
        </div>

        <div className="d-flex flex-column mb10">
          <p className="ml20">Télécharger une image du projet</p>
            <input type="file" className="p10" name="image" accept="image/*" id="image"  {...register("image")} />
          {errors?.image && (
            <p className={`${styles.feedback}`}>{errors.image.message}</p>
          )}
        </div>
        {feedback && <p className={`${styles.feedback} mb20`}>{feedback}</p>}
        {feedbackGood && (
          <p className={`${styles.feedbackGood} mb20`}>{feedbackGood}</p>
        )}
        <button className={`btn btn-primary ${styles.button}`} disabled={isSubmitted}>
          Submit
        </button>
      </form>
    </div>
)
}