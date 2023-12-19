import styles from "./AddProjet.module.scss";
import React, { useState, useEffect } from 'react';
import {  useForm, Controller, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";



export default function AddProjet({user}) {

  const [feedback, setFeedBack] = useState("");
  const [feedbackGood, setFeedBackGood] = useState("");
  const [allTheGenres, setAllTheGenres] = useState([]);
  // const [submitForm,setSubmitForm] = useState()

  useEffect(() => {
    async function getGenres() {
      try {
        const response = await fetch("http://localhost:8003/api/profileImage/getGenres");
        if (response.ok) {
          const genres = await response.json();
          console.log(genres);
          setAllTheGenres(genres);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getGenres();
  }, []);
  
    const yupSchema = yup.object({
        name: yup
          .string()
          .required("Le champ est obligatoire")
          .min(2, "Le champ doit contenir au minimum 2 caractères")
          .max(20),
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
        genre: yup
          .array()
          .min(1,"Selectionner au moins 1 genre"),
        image: yup
          .mixed()
          .required("veuillez selectionner une image"),
          // .test("required", "veuillez selectionner une image", function (value)  {return value !== null && value.length > 0 }),
          
        
      });

      

  

const defaultValues = {
    name: "",
    year: "",
    description: "",
    validation: false,
    image: null,
    link: "",
    genre: [],
 
  };

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    control,
    formState: { errors},
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "genre",
    control,
  });

  async function submit(values) {
    setFeedBack("");
    try {
      clearErrors()
      console.log("genre", values.genre);

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
      const genreValues = values.genre.map((genre) => genre.value);
      formData.append("genre", genreValues);
      formData.append("image", imageBlob);
      formData.append("idUsers", user.idUsers);
      
      console.log(values);
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
            setFeedBackGood("")
          }, 3000)
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

  function addGenres() {
    append({
      value: "",
      
    });
  }

  function deleteGenres(id) {
    remove(id);
  }


  return(
    <div className={`d-flex flex-column justify-content-center align-items-center ${styles.appContainer}`}>
        
        <form onSubmit={handleSubmit(submit)}  >
          <fieldset className={`d-flex align-items-center flex-column mt20  p20 mb20`}>
        <div className="d-flex flex-column mb10">
          <label htmlFor="name" className="mb10 ml20">
            Nom du projet
          </label>
          <input placeholder="Nom du projet" title="indiquer un nom pour le projet" className="p10" type="text" id="name" {...register("name")} />
          {errors?.name && (
            <p className={`${styles.feedback}`}>{errors.name.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb10">
        <label className="mb10 d-flex justify-content-center align-items-center">
            <span className="flex-fill mr10">Genre</span>
            <button
              onClick={addGenres}
              type="button"
              className="btn btn-primary-reverse"
              title="cliqué pour ajouté un genre"
            >
              +
            </button>
          </label>
        <ul>
            {fields.map((genre, index) => (
              <li key={genre.id} className="mb10 d-flex ">
                <select
                  className="mr10"
                  {...register(`genre[${index}].value`)}
                >
                  {allTheGenres.map((genre) => (
                    <option key={genre.idGenre} value={genre.idGenre}>
                      {genre.nameGenre}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => deleteGenres(index)}
                  className="btn btn-primary"
                  title="cliquer pour enlever un genre"
                >
                  -
                </button>
                </li>))}
                </ul>
                {errors?.genre && (
            <p className={`${styles.feedback}`}>{errors.genre.message}</p>
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
              title="ajouter l'année de création de votre projet"
              {...field}
            />
              )}
          />
          </div>
          {errors?.year && (
            <p className={`${styles.feedback}`}>{errors.year.message}</p>
          )}
        </div>
        <div className={`d-flex flex-column mb10  `}>
          <label htmlFor="description" className="mb10 ml10">
            Description du projet
          </label>
          <textarea placeholder="Description" title="ajouté une description de votre projet" className="p10" type="textarea" id="description" rows="10"  {...register("description")} />
          {errors?.description && (
            <p className={`${styles.feedback}`}>{errors.description.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb10">
          <label htmlFor="link" className="mb10 ml20">
            Lien du projet
          </label>
          <input placeholder="Link" className="p10" title="ajouté un lien vers votre projet" type="text" id="link" {...register("link")} />
          {errors?.link && (
            <p className={`${styles.feedback}`}>{errors.link.message}</p>
          )}
        </div>

        <div className="d-flex flex-column mb10">
          <p className="ml20">Télécharger une image du projet</p>
            <input type="file" title="ajouté une image de votre projet" className="p10" name="image" accept="image/*" id="image"  {...register("image")} />
          {errors?.image && (
            <p className={`${styles.feedback}`}>{errors.image.message}</p>
          )}
        </div>
        {feedback && <p className={`${styles.feedback} mb20`}>{feedback}</p>}
        {feedbackGood && (
          <p className={`${styles.feedbackGood} mb20`}>{feedbackGood}</p>
        )}
        <button title="soumettez votre projet" className={`btn btn-primary `} >
          Soumettre votre projet
        </button>
        </fieldset>
      </form>
    </div>
)
}