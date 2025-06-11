import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Works } from './pages/Works.js';


const RoutePage = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Works />} exact/>
        </Routes>
    </BrowserRouter>
  );
}

export default RoutePage;