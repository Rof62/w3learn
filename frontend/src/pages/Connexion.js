import { useState } from "react";
import styles from "../sass/Register.module.scss";
import logo from "../img/logo.png"
import { NavLink,  useNavigate } from "react-router-dom";


export default function Connexion({ getIdUser, toggleRegister, setUserObject, userObject}) {
  
    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: "",
      });

    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");

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

      async function handleClick(e) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setFeedback("");
        e.preventDefault();
        console.log(user);
        if (!user.email.length || !user.password.length) {
          setFeedback("Tous les champs doivent être remplis");
        } else if (!emailRegex.test(user.email)) {
          setFeedback("Email non valide");
        } else {
          try {
            const response = await fetch("http://localhost:8003/login", {
              method: "POST",
              body: JSON.stringify(user),
              headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
              const userBack = await response.json();
              console.log(userBack);
              
              if (userBack.message) {
                setFeedback("Email et/ou mot de passe incorrects");
              } else {
                setFeedbackGood("Connexion réussie ! Vous allez être rediriger");
                getIdUser(userBack);
                setTimeout(() => {
                  toggleRegister()
                  navigate("/profileGestion")
                }, 3000);
                
                setUser({
                  email: "",
                  password: "",
                });
              }
            }
          } catch (error) {
            console.error(error);
          }
        }
      }

    return(
        <div
      className={`d-flex flex-column justify-content-center align-items-center mb20 ${styles.appContainer}`}
    >
      <form className="d-flex align-items-center flex-column card p20 mb20">
      <NavLink to="/" ><img src={logo} alt="" className={`${styles.logo}`} /></NavLink> 
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
        {feedback && <p className={`${styles.feedback} mb20`}>{feedback}</p>}
        {feedbackGood && (
          <p className={`${styles.feedbackGood} mb20`}>{feedbackGood}</p>
        )}
        <div className="d-flex justify-content-center align-items-center mt20">
          <button onClick={handleClick}  className={`btn btn-primary ${styles.button}`}>
            Valider
          </button>
        </div>
      </form>
    </div>
  );
    
}