import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
// Pages
import Home from './components/pages/Home';
import Library from './components/pages/Library';
import FreePlay from './components/pages/FreePlay';
import Action from './components/pages/Action';
import './App.css';
// Header and Footer
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
// Universal CSS components
import './components/elements/sections.css';
import './components/elements/button.css';
import './components/elements/phone.css';
import './components/elements/tooltip.css';

function App() {
  return (
    <>
      <Router>
        <Header className='header'/>
        <div className='main'>
          <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='/library' element={<Library />} />
            <Route path='/freeplay' element={<FreePlay />} />
            <Route path="/play" element={<Action />} />
          </Routes>
        </div>
        <Footer className='footer'/>
      </Router>
    </>
  );
}

export default App;
