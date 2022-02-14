import { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import parseInt from 'lodash/parseInt';
import TimeoutTipsModal from '@/components/TimeoutTipsModal';
import { getEditReportInfo } from '@/store/reducers/reportReducer';

interface EditReportProps {

}

const EditReport: FunctionComponent<EditReportProps> = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(getEditReportInfo(parseInt(id)));
    }
  }, [id]);
  return (
    <>
      report-
      {id}
      {/* <TimeoutTipsModal /> */}
    </>
  );
};

export default EditReport;
