import { FunctionComponent, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { tokenStorage } from '@/utils/storage';
import { getUserInfo } from '@/store/reducers/userReducer';

interface AuthLayoutProps {

}

const AuthLayout: FunctionComponent<AuthLayoutProps> = () => {
  console.log('AuthLayout');
  const dispatch = useDispatch();
  const token = tokenStorage.getItem('token');
  const location = useLocation();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  if (!token) {
    return <Navigate to="/user/login" state={{ redirect: location }} replace />;
  }
  return <Outlet />;
};

export default AuthLayout;
