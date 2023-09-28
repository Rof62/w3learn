import { useState } from "react";
import {  useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink,  useNavigate } from "react-router-dom";
import logo from "../img/logo.png"
import styles from "../sass/Register.module.scss";

export default function Register( {seeLoginForm}) {
  // on récupére toutes les compétences que l'on va stocker dans ce useState
  const [allTheSkills, setAllTheSkills] = useState([]);
  // useState pour l'erreur ou la validation provenant de l'API
  const [feedback, setFeedBack] = useState("");
  const [feedbackGood, setFeedBackGood] = useState("");

  const navigate = useNavigate()

  

  const yupSchema = yup.object({
    username: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Le champ doit contenir au minimum 2 caractères")
      .max(12),
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .email("Vous devez saisir un email valide"),
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(5, "Mot de passe trop court")
      .max(10, "Mot de passe trop long"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf(
        [yup.ref("password", "")],
        "Les mots de passe ne correspondent pas"
      ),
  });

  // valeurs par défaut de notre formulaire d'inscription
  const defaultValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  // register pour connecter les input et recupérer leurs valeurs
  // handleSublit qui va gérer la méthode de soumission
  // reset pour vider les champs après soumission du formulaire
  // control pour connecter les champs dynamiques avec useFieldArray à useForm
  // errors pour le feedback des erreurs
  // isSubmitting pour éviter de valider plusieurs fois le formulaire
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

  

  // il ne sera invoqué que si aucune erreur n'a été rencontré
  // c'est à cet endroit que vous placez votre requete HTTP de type POST pour insérer en BDD en passant par votre API
  async function submit(values) {
    setFeedBack("");
    console.log(values);
    const response = await fetch("http://localhost:8003/api/users/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      const newUser = await response.json();
      console.log("newUser", newUser);
      if (newUser.message) {
        setFeedBack(newUser.message)
      } else {
        setFeedBackGood(newUser.messageGood)
        reset(defaultValues);
        setTimeout(() => {
          
          navigate("/connexion")
        }, 3000)
      }
    } 
  }

  

 

  return (
    <div className={` d-flex flex-column justify-content-center align-items-center ${styles.appContainer} `}>
      <form onSubmit={handleSubmit(submit)} className={`d-flex align-items-center flex-column ${styles.card} p20 mb20`}>
      <NavLink to="/" ><img src={logo} alt="" className={`${styles.logo}`} /></NavLink> 
        <div className="d-flex flex-column mb10">
          <label htmlFor="username" className="mb10 ml20">
            Votre pseudo
          </label>
          <input placeholder="Votre pseudo" className="p10" type="text" id="username" {...register("username")} />
          {errors?.username && (
            <p className={`${styles.feedback}`}>{errors.username.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb10">
          <label htmlFor="email" className="mb10 ml20">
            Votre email
          </label>
          <input type="email" id="email" {...register("email")} placeholder="Email" className="p10"/>
          {errors?.email && (
            <p className={`${styles.feedback}`}>{errors.email.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb10">
          <label htmlFor="password" className="mb10 ml20">
            Mot de passe
          </label>
          <input placeholder="Mot de passe" className="p10" type="password" id="password" {...register("password")} />
          {errors?.password && (
            <p className={`${styles.feedback}`}>{errors.password.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb10">
          <label htmlFor="confirmPassword" className="mb10 ml20">
            Confirmer votre mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            placeholder="Confirmer votre mot de passe"
             className="p10"
          />
          {errors?.confirmPassword && (
            <p className={`${styles.feedback}`}>
              {errors.confirmPassword.message}
            </p>
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
  );
}