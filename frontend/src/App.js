// import { Routes, Route } from 'react-router-dom';
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Header/Navbar'
import Home from './pages/homepage/Home';
import Blockchain from './pages/blockchain/Blockchain';
import Crypto from './pages/crypto/Crypto';
import Metaverse from'./pages/metaverse/Metaverse';
import Blog from "./pages/blog/Blog";
import NFT from './pages/nft/NFT';
import Inscription from "./pages/register/Inscription";
import Connexion from "./pages/login/Connexion";
import Footer from "./components/Footer/Footer";
import ProfileGestion from "./pages/profile/ProfileGestion";
import Termes from "./pages/Conditions d'utilisations/Termes";
import './sass/App.scss';
import Description from "./pages/description/Description";


function App() {
  
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState("");
  const [userlist, setUserlist] = useState([]);
 
console.log({user});

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
