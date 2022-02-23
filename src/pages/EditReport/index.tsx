import { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import parseInt from 'lodash/parseInt';
import { Skeleton } from 'antd';
import TimeoutTipsModal from '@/components/TimeoutTipsModal';
import { getEditReportInfo } from '@/store/reducers/reportReducer';
import { RootState } from '@/store';
import EditReportDicom from './components/EditReportDicom';
import EditReportContent from './components/EditReportContent';
import './index.less';
import RecordDicomPaintProvider from '@/components/Dicom/context/recordDicomPaint';
import CheckImageContextProvider from '@/components/Dicom/context/checkImageProvider';

interface EditReportProps {

}

const EditReport: FunctionComponent<EditReportProps> = () => {
  const dispatch = useDispatch();
  const { is_loading } = useSelector((state: RootState) => state.report);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(getEditReportInfo(parseInt(id)));
    }
  }, [id]);
  return (
    <div className="editReportDetail-container">
      <Skeleton loading={is_loading} active paragraph={{ rows: 6 }}>
        <CheckImageContextProvider>
          <RecordDicomPaintProvider>
            <div className="editReport-source">
              <EditReportDicom />
            </div>
            <EditReportContent />
          </RecordDicomPaintProvider>
        </CheckImageContextProvider>
      </Skeleton>
      <TimeoutTipsModal />
    </div>
  );
};

export default EditReport;
