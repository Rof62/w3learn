import React from 'react';
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../sass/Register.module.scss"

function ForgotPassword() {

    const [feedback, setFeedBack] = useState("");
    const [feedbackGood, setFeedBackGood] = useState("");
    const navigate = useNavigate();

    const yupSchema = yup.object({
        email: yup
          .string()
          .required("Le champ est obligatoire")
          .matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Votre email n'est pas valide"
          ),
      });

      const defaultValues = {
        email: "",
      }

      const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
      } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
      });

      async function submit(values) {
        console.log(values);
        try {
            await fetch(`http://localhost:8003/api/users/resetPassword/${values.email}`)
        } catch (error) {
            console.error(error)
        }
      }

  return (
    <div className={`flex-fill d-flex flex-column justify-content-center align-items-center ${styles.appContainer}`}>
        <h2 className='mb20'>Mot de passe oublié</h2>
    <form onSubmit={handleSubmit(submit)} className="d-flex align-items-center flex-column card p20 mb20">
      
      <div className="d-flex flex-column mb10">
        <label htmlFor="email" className="mb10 ml20">
          Email
        </label>
        <input type="email" placeholder="Votre email" id="email" {...register("email")} />
        {errors?.email && (
          <p className={`${styles.feedback}`}>{errors.email.message}</p>
        )}
      </div>
      {feedback && <p className={`${styles.feedback} mb20`}>{feedback}</p>}
        {feedbackGood && (
          <p className={`${styles.feedbackGood} mb20`}>{feedbackGood}</p>
        )}
        <button className="btn btn-primary" >
          Submit
        </button>
      </form>
      </div>
  )
}

export default ForgotPassword