import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/pages/Home';
import Library from './components/pages/Library';
import FreePlay from './components/pages/FreePlay';
import Action from './components/pages/Action';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/library' element={<Library />} />
          <Route path='/freeplay' element={<FreePlay />} />
          <Route path="/play" element={<Action />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
