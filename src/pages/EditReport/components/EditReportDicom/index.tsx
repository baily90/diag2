import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import DicomJsx from '@/components/Dicom';

interface EditReportDicomProps {

}

const EditReportDicom: FunctionComponent<EditReportDicomProps> = () => {
  console.log('EditReportDicom');
  const { sources } = useSelector((state: RootState) => state.report);
  return (
    <DicomJsx dicomLists={[{ lists: sources }]} />
  );
};

export default EditReportDicom;
