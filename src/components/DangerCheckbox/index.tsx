import { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Checkbox, message, Modal,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import parseInt from 'lodash/parseInt';
import { RootState } from '@/store';
import { handToOthers, updateState } from '@/store/reducers/reportReducer';

interface DangerCheckBoxProps {

}

const DangerCheckbox: FunctionComponent<DangerCheckBoxProps> = () => {
  console.log('DangerCheckbox');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { is_history, is_danger } = useSelector((state: RootState) => state.report);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onChange = (e) => {
    const isChecked = e.target.checked;
    dispatch(updateState({ is_danger: isChecked ? 1 : 0 }));
    setIsModalVisible(isChecked);
  };

  const handleOk = async () => {
    if (id) {
      const { data } = await dispatch(handToOthers(parseInt(id || '')));
      if (data?.id && data?.id !== parseInt(id)) {
        navigate(`/editReport/${data.id}`, { replace: true });
      } else {
        message.info('已经没有报告了');
      }
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Checkbox onChange={onChange} checked={!!is_danger} disabled={is_history}>
        <span style={{ color: '#fff' }}>疑难报告</span>
      </Checkbox>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        footer={[
          <Button onClick={handleCancel}>
            自行处理
          </Button>,
          <Button type="primary" onClick={handleOk}>
            转交其他处理人
          </Button>,
        ]}
      >
        如您对当前报告结果不确定可勾选此项，勾选后可转交至平台其他医生处理或自行判断处理
      </Modal>
    </>
  );
};

export default DangerCheckbox;
