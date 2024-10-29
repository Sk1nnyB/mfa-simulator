import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/pages/Home';
import Library from './components/pages/Library';
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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
