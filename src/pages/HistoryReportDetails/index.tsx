import { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parseInt from 'lodash/parseInt';
import { useDispatch, useSelector } from 'react-redux';
import { getReportDetailInfo } from '@/store/reducers/reportReducer';
import ReportDetailContent from './components/ReportDetailContent';
import './index.less';
import { Skeleton } from 'antd';
import { RootState } from '@/store';

interface HistoryReportDetailsProps {

}

const HistoryReportDetails: FunctionComponent<HistoryReportDetailsProps> = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { is_loading } = useSelector((state: RootState) => state.report);
  useEffect(() => {
    if (id) {
      dispatch(getReportDetailInfo(parseInt(id)));
    }
  }, [id]);

  return (
    <div className="historyReportDetail-container">
      <Skeleton loading={is_loading} active paragraph={{ rows: 6 }}>
        <div className="reportDetail-source">
          source-area
        </div>
        <ReportDetailContent />
      </Skeleton>
    </div>
  );
};

export default HistoryReportDetails;
