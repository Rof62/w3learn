// import { Routes, Route } from 'react-router-dom';
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Blockchain from './pages/Blockchain'
import Crypto from './pages/Crypto'
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
      </Routes>
    </Router> 
    </>
  );
}

export default App;
