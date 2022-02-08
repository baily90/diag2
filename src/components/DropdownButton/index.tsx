import {
  Button, Dropdown, Menu, Modal,
} from 'antd';
import { FunctionComponent, ReactElement, useState } from 'react';
import {
  LockOutlined,
  PoweroffOutlined,
  HomeOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface DropdownButtonProps {
  children: ReactElement
}

const DropdownButton: FunctionComponent<DropdownButtonProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBackHome = () => {
    navigate('/', { replace: true });
  };

  const handleToHistoryReport = () => {
    navigate('/historyReport', { replace: true });
  };

  const handleChangePassword = () => {
    setIsModalVisible(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/user/login');
  };

  const menu = (
    <Menu style={{ width: 120 }}>
      <Menu.Item key="0" onClick={handleBackHome}>
        <HomeOutlined />
        回到首页
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={handleToHistoryReport}>
        <FileOutlined />
        历史报告
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={handleChangePassword}>
        <LockOutlined />
        修改密码
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={handleLogout}>
        <PoweroffOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" arrow>
        {children}
      </Dropdown>
      <Modal
        visible={isModalVisible}
        title="修改密码"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleOk}>
            确认修改
          </Button>,
        ]}
      >
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default DropdownButton;
