import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

interface HistoryReportDetailsProps {

}

const HistoryReportDetails: FunctionComponent<HistoryReportDetailsProps> = () => {
  const { id } = useParams();
  return (
    <>
      HistoryReportDetails-
      {id}
    </>
  );
};

export default HistoryReportDetails;
