import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import ReportHeader from './components/ReportHeader';
import './index.less';

interface ReportLayoutProps {

}

const ReportLayout: FunctionComponent<ReportLayoutProps> = () => {
  console.log('ReportLayout');
  return (
    <div className="ReportLayout-container">
      <ReportHeader />
      <div className="ReportLayout-report">
        <Outlet />
      </div>
    </div>
  );
};

export default ReportLayout;
