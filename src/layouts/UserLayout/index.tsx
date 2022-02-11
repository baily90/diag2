import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import './index.less';

interface UserLayoutProps {

}

const UserLayout: FunctionComponent<UserLayoutProps> = () => {
  console.log('UserLayout');

  return (
    <div className="userLayout-container">
      <div className="userLayout-content">
        <Outlet />
      </div>
      <div className="userLayout-copyright">
        Copyright @ 深至科技诊断医师平台
      </div>
    </div>
  );
};

export default UserLayout;
