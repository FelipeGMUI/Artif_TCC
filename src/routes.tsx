import {Route, Routes, BrowserRouter} from 'react-router-dom';



import {AuthContextProvider} from './context/AuthContext'

import { Home } from './pages/Home/home';
import { NewRoom } from './pages/Home/newRoom';
import { Room } from './pages/Home/Room';






export function Rotas () {


  return(
    <BrowserRouter>
    <AuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={<Home/>}
        />
        <Route path="/room/new" 
        element={<NewRoom/>} 
        />
        <Route path="/rooms/:id" 
        element={<Room/>} 
        />
        <Route path="/rooms/:id/:tittle" 
        element={<Room/>} 
        />
    
      </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}