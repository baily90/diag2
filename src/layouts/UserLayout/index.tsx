import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

interface UserLayoutProps {

}

const UserLayout: FunctionComponent<UserLayoutProps> = () => {
  console.log('UserLayout');

  return (
    <div>
      <Outlet />
      Copyright @ 深至科技诊断医师平台
    </div>
  );
};

export default UserLayout;
