import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated1');

  return isAuthenticated ? <Outlet /> : <Navigate to="/authentication/sign-in" />;
};

export default PrivateRoute;