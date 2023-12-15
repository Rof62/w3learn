import React from 'react';
import {useState, useContext} from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {  useNavigate } from "react-router-dom";
import {AuthContext} from "../../context"
import styles from "../../sass/Register.module.scss"

export default function ResetPassword() {
    const [feedback, setFeedback] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();
  
    const yupSchema = yup.object({
      password: yup.string().required("Le champ est obligatoire").min(5, "Mot de passe trop court").max(10, "Mot de passe trop long"),
      confirmPassword: yup.string().required("Vous devez confirmer votre mot de passe").oneOf([yup.ref("password", "")], "Les mots de passe ne correspondent pas"),
    });
  
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
      resolver: yupResolver(yupSchema),
    });
  
    const submit = async (data) => {
      try {
        const email = new URLSearchParams(window.location.search).get("email");
  
        const response = await fetch("https://wlearnjw3learn.mysql.db/api/gestionProfile/updatePassword", {
          method: "PATCH",
          body: JSON.stringify({ email, password: data.password }),
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          setFeedback(true); // Afficher un message de succès ou rediriger l'utilisateur
          setTimeout(() => {
            navigate("/connexion");
          }, 3000);
        } else {
          throw new Error("Échec de la mise à jour du mot de passe");
        }
      } catch (error) {
        console.error(error);
      }
    };

   

  return (
    <div className={`flex-fill d-flex flex-column justify-content-center align-items-center ${styles.appContainer}`}>
        <h2>Modifier mot de passe</h2>
        <form onSubmit={handleSubmit(submit)} className={`d-flex align-items-center flex-column card p20 mb20 mt20`}>
            <div className="d-flex align-items-center flex-column card p20 mb20 mt20">
                <div className="mb10 d-flex flex-column">
                <label className="mb10 ml20" htmlFor="password">Mot de passe</label>
                <input type="password" {...register("password")} id="password" placeholder="  mot de passe" className="p10"/>
                {errors.password  && <p className="form-error">{errors.password.message}</p>}
            </div>
            <div className="d-flex flex-column mb10">
                <label htmlFor="confirmPassword" className="mb10 ml20">
                Confirmer votre mot de passe
                </label>
                <input type="password" id="confirmPassword" {...register("confirmPassword")} placeholder="confirmer mot de passe" className="p10" />
                {errors?.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
            </div>
            <div>
            {errors.generic  && <p className="form-error">{errors.generic.message}</p>}
         {feedback && <p>Mot de passe modifier avec succés !</p>}
            </div>
                <button className={`btn btn-primary ${styles.button}`} disabled={isSubmitting}>Confirmer</button>
            </div>
        </form>
    </div>
  )
}