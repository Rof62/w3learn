import styles from "../sass/Register.module.scss";
import {  useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddProjet() {
    
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
    // setFeedBack("");
    // console.log(values);
    // const response = await fetch("http://localhost:8003/api/users/addUser", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // });
    // if (response.ok) {
    //   const newUser = await response.json();
    //   console.log("newUser", newUser);
    //   if (newUser.message) {
    //     setFeedBack(newUser.message)
    //   } else {
    //     setFeedBackGood(newUser.messageGood)
    //     reset(defaultValues);
    //     setTimeout(() => {
          
    //       navigate("/connexion")
    //     }, 3000)
    //   }
    // } 
  }

  return(
    <div className="">
        <div className="d-flex justify-content-center mt20">
            <h2>Ajouter un projet pour contribuer au Blog</h2>
        </div>
        <form onSubmit={handleSubmit(submit)} className={`d-flex align-items-center flex-column  p20 mb20`}>
        <div className="d-flex flex-column mb10">
          <label htmlFor="name" className="mb10 ml20">
            Nom du projet
          </label>
          <input placeholder="Nom du projet" className="p10" type="text" id="name" {...register("name")} />
          {errors?.username && (
            <p className={`${styles.feedback}`}>{errors.username.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb10">
          <label htmlFor="year" className="mb10 ml20">
            Année de création du projet
          </label>
          <input placeholder="Année du projet" className="p10" type="number" id="year" {...register("year")} />
          {errors?.username && (
            <p className={`${styles.feedback}`}>{errors.username.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb10">
          <label htmlFor="description" className="mb10 ml20">
            Description du projet
          </label>
          <input placeholder="Description" className="p10" type="text" id="description" {...register("description")} />
          {errors?.username && (
            <p className={`${styles.feedback}`}>{errors.username.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb10">
          <label htmlFor="link" className="mb10 ml20">
            Lien du projet
          </label>
          <input placeholder="Link" className="p10" type="text" id="link" {...register("link")} />
          {errors?.username && (
            <p className={`${styles.feedback}`}>{errors.username.message}</p>
          )}
        </div>
        
        <button className={`btn btn-primary ${styles.button}`} disabled={isSubmitted}>
          Submit
        </button>
      </form>
    </div>
)
}