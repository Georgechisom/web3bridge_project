import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/HomePage.js";

const RoutePage = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} exact/>
        </Routes>
    </BrowserRouter>
  );
}

export default RoutePage;