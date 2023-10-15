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
import ProfileGestion from "./pages/ProfileGestion";
import Termes from "./pages/Conditions d'utilisations/Termes";
import './sass/App.scss';
import Description from "./pages/Description";


function App() {
  
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState("");
  const [userlist, setUserlist] = useState([]);
 
  useEffect(() => {
    
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

 
  
console.log({user});

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
        <Route path="/profileGestion" element={<ProfileGestion  user={user} userlist={userlist} setUser={setUser}/>} />  
        <Route path="/termes" element={<Termes />} />  
        <Route path="/description/:idProjet" element={<Description />} />  
      </Routes>
      <Footer />
    </Router> 
    </>
  );
}

export default App;
