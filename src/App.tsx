import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginRegister';
import Riot from './pages/Master/riot';
import Perfil from './pages/profile/UserProfile';
import Team from './pages/team/TeamProfile';
import PerfilEdit from './pages/profile/EditProfile';
import Adm from './pages/Master/adm';
import Mp from './pages/Payment/mercadoPago';
import { AuthProvider } from './security/AuthContext';
import ProtectedRoute from './security/ProtectedRoute';
import TeamRegister from './pages/team/TeamsRegister';
import Torneio from "./pages/Tournament/index";

//import Teams from './pages/team';
//import Torneios from './pages/tournament';
//import Teams2 from './pages/teams';
        
       // <Route path="/torneios" element={<Torneios />} />
       // <Route path="/teamList" element={<Teams2 />} />
      
      
     //  <Route path="/payment" element={<Adm />} />
        // <Route path="/teams" element={<Teams />} />
     
   
import ADM from './pages/Master';

const App: React.FC = () => {
  return (
    <AuthProvider>
            <BrowserRouter>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/adm" element={<ProtectedRoute element={<ADM />} />} />
                    <Route path="/mp" element={<ProtectedRoute element={<Mp />} />} />
                    <Route path="profiles">
                      <Route index element={<ProtectedRoute element={<Perfil />} />} />
                      <Route path="edit" element={<ProtectedRoute element={<PerfilEdit />} />} />
                    </Route>
                    <Route path="team">
                      <Route index element={<ProtectedRoute element={<Team />} />} />
                      <Route path="edit" element={<ProtectedRoute element={<PerfilEdit />} />} />
                      <Route path="register" element={<ProtectedRoute element={<TeamRegister />} />} />
                    </Route>
                    <Route path="Tournament">
                      <Route index element={<ProtectedRoute element={<Torneio />} />} />
                      <Route path="edit" element={<ProtectedRoute element={<PerfilEdit />} />} />
                    </Route>
                    <Route path="/riot" element={<ProtectedRoute element={<Riot />} />} />
                    <Route path='*' element={<div><img src="./public/icones/molho.png" alt="" /></div>} />
                  </Routes>
                </BrowserRouter>
    </AuthProvider>
   
  );
}

export default App;