import { FunctionComponent } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface AuthLayoutProps {

}

const AuthLayout: FunctionComponent<AuthLayoutProps> = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/user/login" state={{ redirect: location }} replace />;
  }
  return <Outlet />;
};

export default AuthLayout;
