// import { Routes, Route } from 'react-router-dom';
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blockchain from './pages/Blockchain';
import Crypto from './pages/Crypto';
import Metaverse from'./pages/Metaverse';
import Blog from "./pages/Blog";
import NFT from './pages/NFT';
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Footer from "./components/Footer";
import ProfileGestion from "./pages/ProfileGestion"
import './sass/App.scss';


function App() {
  
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState("");
  const [userlist, setUserlist] = useState([]);
  
  
  useEffect(() => {
    // Ici, vous pouvez effectuer une requête au serveur pour récupérer la liste des utilisateurs
    // Par exemple, en utilisant fetch() ou axios()
  
    // Exemple de récupération de données fictives (à remplacer par votre code réel)
    const fetchUserList = async () => {
      try {
        const response = await fetch("http://localhost:8003/api/users/getUserList");
        if (response.ok) {
          const users = await response.json();
          setUserlist(users); // Mettez à jour userlist avec les données récupérées
        } else {
          console.error("Échec de la récupération des données des utilisateurs.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données des utilisateurs :", error);
      }
    };
  
    // Appelez la fonction pour récupérer la liste des utilisateurs
    fetchUserList();
  }, [user]);

 
  
console.log(user);
  // function updateUser(newUsername, newEmail, newPassword) {
  //   setUserlist(
  //     userlist.map((user) => (user.idUsers === newUsername.idUsers ? newUsername : user)) ||  
  //     userlist.map((user) => (user.idUsers === newEmail.idUsers ? newEmail : user)) 
  //     // userlist.map((user) => (user.idUsers === newPassword.idUsers ? newPassword : user))  
  //   ); 
  // }
  // function updateUser2( newPassword) {
  //   setUserlist(
  //     userlist.map((user) => (user.idUsers === newPassword.idUsers ? newPassword : user))   
        
  //   ); 
  // }
  console.log(userlist) ;

  function deleteUser(deletedUser) {
    setUserlist(userlist.filter((user) => user.id !== deletedUser.id));
  }

  function deconnexion() {
    setLogged(false)
    setUser(null)
  }

  function getUser(userLogged) {
    setUser(userLogged);
  }

  console.log(user);

  return (
    <>
    <Router >
      <Navbar   deconnexion={deconnexion}  user={user}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blockchain" element={<Blockchain />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/nft" element={<NFT />} />
        <Route path="/metaverse" element={<Metaverse />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/inscription" element={<Inscription  />} />         
        <Route path="/connexion" element={<Connexion getUser={getUser}  />} />         
        <Route path="/profileGestion" element={<ProfileGestion  user={user} userlist={userlist}/>} />  
      </Routes>
      <Footer />
    </Router> 
    </>
  );
}

export default App;
