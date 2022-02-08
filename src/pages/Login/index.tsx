import { Button } from 'antd';
import { FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location?.state?.redirect?.pathname || '/';

  const login = () => {
    localStorage.setItem('token', '123');
    navigate(redirect, { replace: true });
  };

  return (
    <div>
      <Button onClick={login}>登录</Button>
    </div>
  );
};

export default Login;
