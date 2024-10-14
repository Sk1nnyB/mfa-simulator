import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/pages/Home';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route  path='/' index element={<Home />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
