import React, {Suspense, Fragment} from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer         from './components/Footer';
import Navbar         from './components/Navbar';
import HomePage       from './components/pages/HomePage';
import NotFoundPage   from './components/pages/NotFoundPage';
import NotesListPage  from './components/pages/NotesListPage';
import AuthPage       from './components/pages/auth/AuthPage'
import AuthLoginPage  from './components/pages/auth/AuthLoginPage'
import AuthSignupPage from './components/pages/auth/AuthSignupPage'
import DevDocsPage    from './components/pages/DevDocsPage'

// Not a secret. WIP Until there is no way to auth properly.
Cookies.set("AUTH_TOKEN", "12d145c6f8f6dce5c4958f143de6a59557555fc6");

function App() {
  return (
    <Suspense fallback={<Fragment/>}>
      <BrowserRouter>
        <div className="App d-flex flex-column min-vh-100">
          <Navbar/>
          <div className="container-fluid mt-auto">
            <Routes>
              <Route path='/' element={<HomePage/>} /> 
              <Route path='/list' element={<NotesListPage/>} /> 
              <Route path='/auth' element={<AuthPage/>} /> 
              <Route path='/auth/login' element={<AuthLoginPage/>} /> 
              <Route path='/auth/signup' element={<AuthSignupPage/>} /> 
              <Route path='/dev/docs' element={<DevDocsPage/>} /> 
              
              <Route path='*' element={<NotFoundPage/>} />
            </Routes>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
      </Suspense>
  );
}

export default App;