import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Pages
import Home from './components/pages/Home';
import Library from './components/pages/Library';
import FreePlay from './components/pages/FreePlay';
import Action from './components/pages/Action';
import Feedback from './components/pages/Feedback';
import MFA_Assistant from './components/pages/MFA_Assistant';
import './App.css';
// Header and Footer
import Header from './components/elements/header/Header';
import Footer from './components/elements/footer/Footer';
// Universal CSS components
import './components/elements/sections.css';
import './components/elements/button.css';
import './components/elements/phone.css';
import './components/elements/tooltip.css';

function App() {
  return (
    <>
    {/* Add these flags to disable warnings */}
      <Router future={{ v77_relativeSplatPath: true, v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Header className='header'/>
        <div className='main'>
          <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='/library' element={<Library />} />
            <Route path='/freeplay' element={<FreePlay />} />
            <Route path="/play" element={<Action />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/mfa-assistant" element={<MFA_Assistant />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </div>
        <Footer className='footer'/>
      </Router>
    </>
  );
}

export default App;
