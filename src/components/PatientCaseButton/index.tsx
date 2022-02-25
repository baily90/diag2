import { Affix, Button, Modal } from 'antd';
import { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCaseList } from '@/store/reducers/patientCaseReducer';
import './index.less';
import { RootState } from '@/store';
import ReportDetail from './components/ReportDetail';

interface PatientCaseButtonProps {

}

const PatientCaseButton: FunctionComponent<PatientCaseButtonProps> = () => {
  console.log('PatientCaseButton');
  const dispatch = useDispatch();
  const { is_history, check_id, diag_id } = useSelector((state: RootState) => state.report);
  const { isLoading, caseList } = useSelector((state: RootState) => state.patientCase);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getPatienCase = async () => {
    const params: { reportId?: number; checkId?: number } = {};
    if (is_history) {
      params.reportId = diag_id;
    } else {
      params.checkId = check_id;
    }
    const res = await dispatch(getCaseList(params));
    if (res?.code === 200) {
      showModal();
    }
  };

  return (
    <>
      <Button className="btn-normal" onClick={getPatienCase} loading={isLoading}>历史病例</Button>
      <Modal
        title={(
          <>
            患者历史病例
            <span style={{ color: 'red' }}>（仅供参考）</span>
          </>
        )}
        width={1000}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" onClick={handleCancel}>
            关闭
          </Button>,
        ]}
        destroyOnClose
      >
        {caseList?.map((item) => (
          <ReportDetail key={item.reportId} {...item} />
        ))}
      </Modal>
    </>
  );
};

export default PatientCaseButton;
