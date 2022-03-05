import React from 'react';
import NotesListFetched from './components/NotesListFetched';
import Cookies from 'js-cookie';

// Not a secret. WIP Until there is no way to auth properly.
Cookies.set("AUTH_TOKEN", "12d145c6f8f6dce5c4958f143de6a59557555fc6");

function App() {
  return (
    <div className="App container-fluid">
      <NotesListFetched/>
    </div>
  );
}

export default App;