// import { Routes, Route } from 'react-router-dom';
import React from "react";
import { useState } from "react";
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
  const [userObject, setUserObject] = useState()
  

  console.log("test2" + userObject);

  function updateUser(newUsername) {
    setUserlist(
      userlist.map((user) => (user.id === newUsername.id ? newUsername : user))
    );
  }

  function deleteUser(deletedUser) {
    setUserlist(userlist.filter((user) => user.id !== deletedUser.id));
  }

 

  function toggleRegister() { 
    setLogged(true);
    
  }

 

  function deconnexion() {
    setLogged(false)
    setUser(null)
  }

  function getIdUser(userLogged) {
    setUser(userLogged);
  }

  console.log(user);

  return (
    <>
    <Router >
      <Navbar  logged={logged} deconnexion={deconnexion} toggleRegister={toggleRegister} user={user}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blockchain" element={<Blockchain />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/nft" element={<NFT />} />
        <Route path="/metaverse" element={<Metaverse />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/inscription" element={<Inscription  />} />         
        <Route path="/connexion" element={<Connexion getIdUser={getIdUser} toggleRegister={toggleRegister} setUserObject={setUserObject} userObject={userObject}/>} />         
        <Route path="/profileGestion" element={<ProfileGestion updateUser={updateUser} deleteUser={deleteUser}  user={user}/>} />  
      </Routes>
      <Footer />
    </Router> 
    </>
  );
}

export default App;
