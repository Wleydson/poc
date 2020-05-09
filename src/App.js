import React from 'react';
import { HashRouter } from 'react-router-dom'

import Rotas from './rotas'
import Navbar from './components/navbar' 

function App() {
  return (
    <div className="container">
      <HashRouter>
        <Navbar />
        <Rotas />   
      </HashRouter>   
    </div>
  );
}

export default App;
