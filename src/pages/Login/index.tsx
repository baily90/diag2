import { Button } from 'antd';
import { FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { tokenStorage } from '@/utils/storage';
import iconLogin from '@/assets/images/icon_login.png';
import './index.less';

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
    tokenStorage.setItem('张燕龙', '1XOVq438kklTL');
    tokenStorage.setItem('token', '1XOVq438kklTL');
    navigate(redirect, { replace: true });
  };

  return (
    <div className="login-container">
      <img className="login-icon" src={iconLogin} alt="" />
      <div className="login-label">诊断医师平台</div>
      <Button onClick={login}>登录</Button>
    </div>
  );
};

export default Login;
