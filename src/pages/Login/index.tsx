import { Button } from 'antd';
import { FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { tokenStorage } from '@/utils/storage';

interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location?.state?.redirect?.pathname || '/';

  const login = () => {
    // tokenStorage.clear();
    // tokenStorage.setItem(data.name, data.token);
    // tokenStorage.setItem("token", data.token);
    tokenStorage.clear();
    tokenStorage.setItem('张燕龙', '1PEaENBHKI5IH');
    tokenStorage.setItem('token', '1PEaENBHKI5IH');
    navigate(redirect, { replace: true });
  };

  return (
    <div>
      <Button onClick={login}>登录</Button>
    </div>
  );
};

export default Login;
