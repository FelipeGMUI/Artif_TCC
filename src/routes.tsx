import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';

import { Home } from './pages/Home/home';
import { NewRoom } from './pages/Home/newRoom';
import { Room } from './pages/Home/Room';

export function Rotas() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element = {<PrivateRoute/>}>
            <Route path="/room/new" element={<NewRoom/>} /> 
            <Route path="/rooms/:id" element={<Room />} />
            <Route path="/rooms/:id/:tittle" element={<Room />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
