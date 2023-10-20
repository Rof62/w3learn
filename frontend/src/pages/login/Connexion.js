import styles from "../../sass/Register.module.scss";
import logo from "../../img/logo.png"
import { NavLink,  useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {useContext} from "react"
import {AuthContext} from "../../context"



export default function Login({  }) {

    const navigate = useNavigate();
    const {login} = useContext(AuthContext)

  const [feedback, setFeedBack] = useState("");
  const [feedbackGood, setFeedBackGood] = useState("");

  

  const yupSchema = yup.object({
    
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .email("Vous devez saisir un email valide"),
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(5, "Mot de passe trop court")
      .max(10, "Mot de passe trop long"),
  });

  const defaultValues = {
    password: "",
    email: "",
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  async function submit(values) {
    try {
      clearErrors();
    await login(values)
    navigate("/profileGestion");
    
   } catch (error) {
     setError("generic", {type: "generic", message: error})  
   }
    };

  return (
    <div className={`flex-fill d-flex flex-column justify-content-center align-items-center ${styles.appContainer}`}>
      <form onSubmit={handleSubmit(submit)} className="d-flex align-items-center flex-column card p20 mb20">
      <NavLink to="/" ><img src={logo} alt="" className={`${styles.logo}`} /></NavLink> 
        <div className="d-flex flex-column mb10">
          <label  htmlFor="email" className="mb10 ml20">
            Email
          </label>
          <input className="p10" placeholder="Votre email" type="email" id="email" {...register("email")} />
          {errors?.email && (
            <p className={`${styles.feedback}`}>{errors.email.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb10">
          <label htmlFor="password" className="mb10 ml20">
            Password
          </label>
          <input className="p10" placeholder="Mot de passe" type="password" id="password" {...register("password")} />
          {errors?.password && (
            <p className={`${styles.feedback}`}>{errors.password.message}</p>
          )}
        </div>
        {feedback && <p className={`${styles.feedback} mb20`}>{feedback}</p>}
        {feedbackGood && (
          <p className={`${styles.feedbackGood} mb20`}>{feedbackGood}</p>
        )}
        <button className={`btn btn-primary ${styles.button}`}  disabled={isSubmitted}>
          Submit
        </button>
      </form>
    </div>
  );
}


