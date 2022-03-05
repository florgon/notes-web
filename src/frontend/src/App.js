import React from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NotFoundPage from './components/pages/NotFoundPage';
import HomePage from './components/pages/HomePage';

// Not a secret. WIP Until there is no way to auth properly.
Cookies.set("AUTH_TOKEN", "12d145c6f8f6dce5c4958f143de6a59557555fc6_");

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container-fluid">
          <Routes>
            <Route path='/' element={<HomePage/>} /> 
            <Route path='*' element={<NotFoundPage/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;