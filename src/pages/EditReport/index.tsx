import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

interface EditReportProps {

}

const EditReport: FunctionComponent<EditReportProps> = () => {
  const { id } = useParams();

  return (
    <>
      report-
      {id}
    </>
  );
};

export default EditReport;
