// Libraries.
import React, {Suspense} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Import wide use components.
import Footer          from './components/Footer';
import Navbar          from './components/Navbar';
import LoadingFallback from './LoadingFallback';

// Import pages.
import HomePage        from './pages/HomePage';
import NotFoundPage    from './pages/NotFoundPage';
import NotesListPage   from './pages/NotesListPage';
import CreateNotePage  from './pages/CreateNotePage';
import NoteEditorPage  from './pages/NoteEditorPage';
import SettingsPage    from './pages/SettingsPage';
import AuthPage        from './pages/auth/AuthPage';
import AuthLoginPage   from './pages/auth/AuthLoginPage';
import AuthLogoutPage  from './pages/auth/AuthLogoutPage';
import AuthSignupPage  from './pages/auth/AuthSignupPage';
import AuthConnectPage from './pages/auth/AuthConnectPage'
import DevDocsPage     from './pages/DevDocsPage';

// Importing contexts for global application context.
import {AuthProvider} from './contexts/AuthContext';
import {SettingsProvider} from './contexts/SettingsContext';


const PageRoutes = function(){
  // Returns React router routes for pages.
  return (
    <Routes>
      {/* Index. */}
      <Route path='/' element={<HomePage/>} /> 
      
      {/* Other. */}
      <Route path='/list' element={<NotesListPage/>} /> 
      <Route path='/note' element={<NoteEditorPage/>} /> 
      <Route path='/create' element={<CreateNotePage/>} /> 
      <Route path='/settings' element={<SettingsPage/>} /> 
      
      {/* Auth system. */}
      <Route path='/auth' element={<AuthPage/>} /> 
      <Route path='/auth/login' element={<AuthLoginPage/>} /> 
      <Route path='/auth/logout' element={<AuthLogoutPage/>} /> 
      <Route path='/auth/signup' element={<AuthSignupPage/>} />
      <Route path='/auth/connect' element={<AuthConnectPage/>} />

      {/* Other stuff. */}
      <Route path='/dev/docs' element={<DevDocsPage/>} /> 
      
      {/* Error handlers. */}
      <Route path='*' element={<NotFoundPage/>} />
    </Routes>
  )
}

const AppContainer = function(){
  // Main application container.
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar/>
      <div className="container-fluid mt-auto">
        <PageRoutes/>
      </div>
      <Footer/>
    </div>
  )
}

const App = function() {
  // Base application component.
  return (
    <Suspense fallback={<LoadingFallback/>}>
      <AuthProvider><SettingsProvider>
        <BrowserRouter>
          <AppContainer/>
        </BrowserRouter>
        </SettingsProvider></AuthProvider>
    </Suspense>
  );
}

export default App;