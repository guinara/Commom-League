import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Riot from './pages/riot'
import Cadastro from './pages/cadastro'

 
function App() {
  return (
    <BrowserRouter> 
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/riot" element={<Riot />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;