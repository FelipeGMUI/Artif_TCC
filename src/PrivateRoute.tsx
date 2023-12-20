import { useAuth} from './hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

  const PrivateRoute = () => {
    const { isLoggedIn } = useAuth();
  
    return isLoggedIn ? <Outlet/> : <Navigate to ='/'/>
  }
  export default PrivateRoute;