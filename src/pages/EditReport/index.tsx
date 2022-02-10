import { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoctorCheckService } from '@/services/editReport';

interface EditReportProps {

}

const EditReport: FunctionComponent<EditReportProps> = () => {
  const { id } = useParams();
  useEffect(() => {
    getDoctorCheckService(id);
  }, [id]);
  return (
    <>
      report-
      {id}
    </>
  );
};

export default EditReport;
