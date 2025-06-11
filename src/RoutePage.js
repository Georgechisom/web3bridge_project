import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { HomePage } from "./pages/HomePage.js";
import Work from "./pages/work.js";


const RoutePage = () => {
  return (
    <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<HomePage />} exact/> */}
          <Route path='/' element={<Work />} exact/>
        </Routes>
    </BrowserRouter>
  );
}

export default RoutePage;