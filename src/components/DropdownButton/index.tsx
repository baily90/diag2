import {
  Button, Dropdown, Menu, Modal,
} from 'antd';
import {
  FunctionComponent, ReactElement, useState,
} from 'react';
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
    Modal.confirm({
      title: '退出登录',
      content: '确认要退出登录吗？退出登录后会将您名下的报告分配给其他医生。',
      closable: true,
      okText: '确定',
      cancelText: '取消',
      maskClosable: true,
      onOk: () => {
        localStorage.clear();
        navigate('/user/login');
      },
    });
  };

  const menu = (
    <Menu style={{ width: 120 }}>
      <Menu.Item key="0" onClick={handleBackHome}>
        <HomeOutlined />
        <span style={{ marginLeft: '5px' }}>回到首页</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={handleToHistoryReport}>
        <FileOutlined />
        <span style={{ marginLeft: '5px' }}>历史报告</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={handleChangePassword}>
        <LockOutlined />
        <span style={{ marginLeft: '5px' }}>修改密码</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={handleLogout}>
        <PoweroffOutlined />
        <span style={{ marginLeft: '5px' }}>退出登录</span>
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
