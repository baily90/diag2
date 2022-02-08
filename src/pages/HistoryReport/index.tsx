import { Button } from 'antd';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

interface HistoryReportProps {

}

const HistoryReport: FunctionComponent<HistoryReportProps> = () => {
  const navigate = useNavigate();
  const handleGo2Detail = () => {
    navigate('/historyReportDetails/11112222');
  };

  return (
    <>
      <div>HistoryReport</div>
      <Button onClick={handleGo2Detail}>去详情</Button>
    </>
  );
};

export default HistoryReport;
