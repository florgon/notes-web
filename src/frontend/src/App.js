import React, {Suspense, Fragment} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Footer         from './components/Footer';
import Navbar         from './components/Navbar';

import HomePage       from './pages/HomePage';
import NotFoundPage   from './pages/NotFoundPage';
import NotesListPage  from './pages/NotesListPage';
import AuthPage       from './pages/auth/AuthPage';
import AuthLoginPage  from './pages/auth/AuthLoginPage';
import AuthLogoutPage from './pages/auth/AuthLogoutPage';
import AuthSignupPage from './pages/auth/AuthSignupPage';
import DevDocsPage    from './pages/DevDocsPage';

import {AuthProvider} from './contexts/AuthContext';


function App() {
  return (
    <Suspense fallback={<Fragment/>}>
      <AuthProvider>
        <BrowserRouter>
          <div className="App d-flex flex-column min-vh-100">
            <Navbar/>
            <div className="container-fluid mt-auto">
              <Routes>
                <Route path='/' element={<HomePage/>} /> 
                
                <Route path='/list' element={<NotesListPage/>} /> 

                <Route path='/auth' element={<AuthPage/>} /> 
                <Route path='/auth/login' element={<AuthLoginPage/>} /> 
                <Route path='/auth/logout' element={<AuthLogoutPage/>} /> 
                <Route path='/auth/signup' element={<AuthSignupPage/>} />

                <Route path='/dev/docs' element={<DevDocsPage/>} /> 
                
                <Route path='*' element={<NotFoundPage/>} />
              </Routes>
            </div>
            <Footer/>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </Suspense>
  );
}

export default App;