import { Button, Modal } from 'antd';
import { BaseButtonProps } from 'antd/lib/button/button';
import { FunctionComponent, useState } from 'react';

const ReportRuleButton: FunctionComponent<BaseButtonProps> = ({
  ...props
}) => {
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

  return (
    <>
      <Button {...props} onClick={showModal}>报告出具规则</Button>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleOk}>
            我知道了
          </Button>,
        ]}
      >
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ReportRuleButton;
