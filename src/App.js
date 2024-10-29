import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/pages/Home';
import Library from './components/pages/Library';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route  path='/mfa-simulator' index element={<Home />} />
          <Route  path='/mfa-simulator/library' index element={<Library />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
