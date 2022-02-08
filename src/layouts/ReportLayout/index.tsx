import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import './index.less';

interface ReportLayoutProps {

}

const ReportLayout: FunctionComponent<ReportLayoutProps> = () => {
  console.log('ReportLayout');
  return (
    <div className="ReportLayout-container">
      <div className="header">header</div>
      <div className="report">
        <Outlet />
      </div>
    </div>
  );
};

export default ReportLayout;
