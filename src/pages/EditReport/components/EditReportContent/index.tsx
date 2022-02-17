import { FunctionComponent } from 'react';
import PreviewReportButton from '@/components/PreviewReportButton';

interface EditReportContentProps {

}

const EditReportContent: FunctionComponent<EditReportContentProps> = () => {
  console.log('EditReportContent');

  return (
    // <>EditReportContent</>
    <PreviewReportButton buttonText="下一步" block />
    // <iframe style={{ width: '100%' }} src={'https://sit-diag-dynamic.weicha88.com?type=2&defaultData={"tabs":{"left":{"intimal_thickness":""},"right":{"intimal_thickness":""}}}&origin=https://sit-diag.weicha88.coms'} frameBorder="0" />
  );
};

export default EditReportContent;
