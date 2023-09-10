// import { Routes, Route } from 'react-router-dom';
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Blockchain from './pages/Blockchain'
import Crypto from './pages/Crypto'
import Metaverse from'./pages/Metaverse'
import NFT from './pages/NFT'
import './sass/App.scss'


function App() {
  return (
    <>
    <Router >
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/blockchain" element={<Blockchain />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/nft" element={<NFT />} />
        <Route path="/metaverse" element={<Metaverse />} />
      </Routes>
    </Router> 
    </>
  );
}

export default App;
