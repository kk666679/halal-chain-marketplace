import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';
import Certification from '../features/certification/Certification';
import Marketplace from '../features/marketplace/Marketplace';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/certification" element={<Certification />} />
            <Route path="/marketplace/*" element={<Marketplace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;