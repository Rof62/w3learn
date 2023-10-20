// import { Routes, Route } from 'react-router-dom';
import React, { Suspense } from "react";
import {  Outlet, useLoaderData } from "react-router-dom";
import Navbar from './components/Header/Navbar'
import Footer from "./components/Footer/Footer";

import Termes from "./pages/Conditions d'utilisations/Termes";
import './sass/App.scss';
import AuthProvider from "./components/AuthProvider/AuthProvider";


function App() {

  return (
    <>
    
      <AuthProvider>
      <Navbar     />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
      </AuthProvider>
    
    </>
  );
}

export default App;
