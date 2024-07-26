import { useAuth } from './AuthContext';

const useCheckIfIsLogged = () => {
    const { authState } = useAuth();
    return authState.token ? true : false;  
};

export default useCheckIfIsLogged;

/*import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from "./AuthContext";

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children, redirectTo = "/signin/" }) => {
  const { user } = useAuth()
  const storedAuth = localStorage.getItem('cuponeraToken');
  const location = useLocation();

  return user && storedAuth ? (
    children ? children : <Outlet />
  ): (
    <Navigate to= { redirectTo } replace state={{ from: location}} />
  );
}*/