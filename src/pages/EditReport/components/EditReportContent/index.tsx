import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PreviewReportButton from '@/components/PreviewReportButton';
import { RootState } from '@/store';
import Thyroid from './position/Thyroid';
import Carotid from './position/Carotid';
import LiverCourage from './position/LiverCourage';
import Universal from './position/Universal';
import Breast from './position/Breast';
import Mesareic from './position/Mesareic';
import { updateState } from '@/store/reducers/reportReducer';
import './index.less';

interface EditReportContentProps {

}

const EditReportContent: FunctionComponent<EditReportContentProps> = () => {
  console.log('EditReportContent');
  const dispatch = useDispatch();
  const { body_region_id: type } = useSelector((state: RootState) => state.report);

  const renderForm = () => {
    switch (type) {
      case 1:
        return <Thyroid />;
      case 2:
        return <Carotid />;
      case 3:
        return <LiverCourage />;
      case 4:
      case 5:
        return <Universal />;
      case 6:
        return <Breast />;
      case 7:
        return <Mesareic />;
      default:
        return null;
    }
  };

  return (
    <div className="editReport-content">
      {renderForm()}
    </div>
  );
};

export default EditReportContent;
