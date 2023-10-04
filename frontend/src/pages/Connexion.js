import styles from "../sass/Register.module.scss";
import logo from "../img/logo.png"
import { NavLink,  useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


export default function Login({ getUser }) {

  const [feedback, setFeedBack] = useState("");
  const [feedbackGood, setFeedBackGood] = useState("");

  const navigate = useNavigate()

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
    reset,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  async function submit(values) {
    setFeedBack("");
    console.log(values);
    const response = await fetch("http://localhost:8003/api/users/login", {
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
      } 
      else {
        setFeedBackGood("Connexion réussi ! vous allez être rediriger")
        reset(defaultValues);
        console.log("User recuperer", newUser);
        reset(defaultValues);
        setTimeout(() => {
          // toggleRegister()
          getUser(newUser)
          navigate("/profileGestion")
        }, 3000)
      };
    }};

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


