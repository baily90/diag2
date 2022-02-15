import {
  Button, Dropdown, Form, Input, Menu, message, Modal,
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
import { useForm } from 'antd/lib/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '@/store/reducers/loginReducer';
import { RootState } from '@/store';
import { cancleReport } from '@/store/reducers/reportReducer';

interface DropdownButtonProps {
  children: ReactElement,
  position: string
}

const DropdownButton: FunctionComponent<DropdownButtonProps> = ({
  children,
  position,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = useForm();
  const { diag_id, is_withdraw, is_history } = useSelector((state: RootState) => state.report);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBackHome = async () => {
    if (!is_withdraw && !is_history) {
      await dispatch(cancleReport(diag_id));
    }
    navigate('/', { replace: true });
  };

  const handleToHistoryReport = async () => {
    if (!is_withdraw && !is_history) {
      await dispatch(cancleReport(diag_id));
    }
    navigate('/historyReport', { replace: true });
  };

  const handleChangePassword = () => {
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      const res = await dispatch(changePassword(values));
      console.log(res);
      if (res?.code === 200) {
        navigate('/user/login', { replace: true });
        message.success(res?.msg);
      }
    } catch (error) {
      console.log(error);
    }
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
      {
        position === 'report' && (
        <>
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
        </>
        )
      }

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
        footer={null}
        afterClose={() => form.resetFields()}
      >
        <Form
          name="basic"
          size="large"
          form={form}
          onFinish={onFinish}
        >
          {/* 原密码 */}
          <Form.Item
            label="原密码"
            name="old_password"
            rules={[
              {
                required: true,
                message: '请输入原密码',
              }]}
          >
            <Input.Password placeholder="请输入原密码" />
          </Form.Item>
          {/* 新密码 */}
          <Form.Item
            label="新密码"
            name="new_password"
            rules={[
              {
                required: true,
                message: '请输入新密码',
              },
              {
                pattern: /^[A-Za-z0-9]{6,18}$/,
                message: '密码不符合要求',
              }]}
          >
            <Input.Password maxLength={18} placeholder="6-18位字母或数字" />
          </Form.Item>
          {/* 确认新密码 */}
          <Form.Item
            label="确认新密码"
            name="confirm_password"
            rules={[
              { required: true, message: '请输入确认新密码' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value) {
                    return Promise.resolve();
                  }
                  if (!/^[A-Za-z0-9]{6,18}$/.test(value)) {
                    return Promise.reject('密码不符合要求');
                  }
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('新密码两次输入的不一致');
                },
              }),
            ]}
          >
            <Input.Password placeholder="6-18位字母或数字" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" block>确认修改</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DropdownButton;
