import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import parseInt from 'lodash/parseInt';
import { Button, message } from 'antd';
import { getNextReport } from '@/store/reducers/reportReducer';
import { RootState } from '@/store';
import './index.less';

interface ReportDetailContentProps {

}

const ReportDetailContent: FunctionComponent<ReportDetailContentProps> = () => {
  console.log('ReportDetailContent');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { report_detail_html } = useSelector((state: RootState) => state.report);

  const handleGetNextReport = async () => {
    if (!id) return;
    const { code, data } = await dispatch(getNextReport(parseInt(id)));
    if (code === 200) {
      if (data?.id && data?.id !== parseInt(id)) {
        navigate(`/historyReportDetails/${data.id}`, { replace: true });
      } else {
        message.info('已经没有报告了');
      }
    }
  };
  return (
    <div className="reportDetail-content">
      <iframe className="h5-webview" title="h5-webview" srcDoc={report_detail_html}>
        {' '}
      </iframe>
      <div className="btn-next-report">
        <Button type="primary" block onClick={handleGetNextReport}>下一份报告</Button>
      </div>
    </div>
  );
};

export default ReportDetailContent;
