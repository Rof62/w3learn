import { useState } from "react";
import styles from "../sass/Register.module.scss";
import logo from "../img/logo.png"
import { NavLink, useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [feedback, setFeedback] = useState("");
  const [feedbackGood, setFeedbackGood] = useState("");

  function handleInputUsername(e) {
    const value = e.target.value;
    setUser({
      ...user,
      username: value,
    });
  }

  function handleInputEmail(e) {
    const value = e.target.value;
    setUser({
      ...user,
      email: value,
    });
  }

  function handleInputPassword(e) {
    const value = e.target.value;
    setUser({
      ...user,
      password: value,
    });
  }

  function handleInputConfirmPassword(e) {
    const value = e.target.value;
    setUser({
      ...user,
      confirm_password: value,
    });
  }

  async function handleClick(e) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setFeedback("");
    e.preventDefault();
    console.log(user);
    if (!user.username.length || !user.email.length || !user.password.length) {
      setFeedback("Tous les champs doivent être remplis");
    } else if (user.password !== user.confirm_password) {
      setFeedback("Les mots de passe doivent être identiques");
    } else if (!emailRegex.test(user.email)) {
      setFeedback("Email non valide");
    } else {
      try {
        const response = await fetch("http://localhost:8003/addUser", {
          method: "POST",
          body: JSON.stringify(user),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const userBack = await response.json();
          console.log(userBack);
          if (userBack.message) {
            setFeedback("Email déja existant");
          } else {
            setFeedbackGood("Inscription réussie ! Vous allez être rediriger");
            setTimeout(() => {
              navigate("/connexion")
            }, 3000);
            setUser({
              username: "",
              email: "",
              password: "",
              confirm_password: "",
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center mb20 ${styles.appContainer}`}
    >
        
      <form className="d-flex align-items-center flex-column card p20 mb20">
      <NavLink to="/" ><img src={logo} alt="" className={`${styles.logo}`} /></NavLink> 
        <input
          className="p10"
          type="text"
          value={user.username}
          placeholder="Pseudo"
          id="username"
          onInput={handleInputUsername}
        />
        <input
          className="p10"
          type="email"
          value={user.email}
          placeholder="Email"
          id="email"
          onInput={handleInputEmail}
        />
        <input
          className="p10"
          type="password"
          value={user.password}
          placeholder="Mot de passe"
          id="password"
          onInput={handleInputPassword}
        />
        <input
          className="p10"
          type="password"
          value={user.confirm_password}
          placeholder="Vérification du mot de passe"
          id="confirm_password"
          onInput={handleInputConfirmPassword}
        />
        {feedback && <p className={`${styles.feedback} mb20`}>{feedback}</p>}
        {feedbackGood && (
          <p className={`${styles.feedbackGood} mb20`}>{feedbackGood}</p>
        )}
        <div className="d-flex justify-content-center align-items-center mt20">
          <button onClick={handleClick} className={`btn btn-primary ${styles.button}`}>
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}