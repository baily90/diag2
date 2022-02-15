import {
  Button, Form, Input, message,
} from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'antd/lib/form/Form';
import { useDispatch } from 'react-redux';
import iconLogin from '@/assets/images/icon_login.png';
import {
  resetPassword, sendSms,
} from '@/store/reducers/loginReducer';
import './index.less';

interface ResetPasswordProps {

}

const ResetPassword: FunctionComponent<ResetPasswordProps> = () => {
  console.log('ResetPassword');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [countDown, setCountDown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await dispatch(resetPassword(values));
      if (res?.code === 200) {
        message.success(res.msg);
        navigate('/user/login', { replace: true });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countDown === 0) {
        clearTimeout(timer);
        return;
      }
      setCountDown((count) => count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countDown]);

  const onSendMessage = () => {
    form.validateFields(['phone']).then(async (values) => {
      const { phone } = values;
      const res = await dispatch(sendSms(phone));
      if (res?.code === 200) {
        setCountDown(60);
        message.success(res?.msg);
      }
    }).catch((e) => {
      console.log(e);
    });
  };

  return (
    <div className="login-container">
      <img className="login-icon" src={iconLogin} alt="" />
      <div className="login-label">诊断医师平台</div>
      <Form
        name="basic"
        size="large"
        form={form}
        onFinish={onFinish}
      >
        {/* 手机号 */}
        <Form.Item
          name="phone"
          rules={[{ required: true, message: '请输入手机号' },
            { pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/, message: '请输入正确的手机号' }]}
        >
          <Input maxLength={11} prefix="手机号" placeholder="请输入手机号" />
        </Form.Item>
        {/* 验证码 */}
        <Form.Item noStyle>
          <Form.Item
            style={{ display: 'inline-flex', width: 250, marginRight: 10 }}
            name="code"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input prefix="验证码" maxLength={6} placeholder="请输入验证码" />
          </Form.Item>
          <div style={{
            display: 'inline-flex',
          }}
          >
            <Button type="primary" onClick={onSendMessage} disabled={!!countDown}>
              {!countDown && <span style={{ display: 'inline-flex', width: 80 }}>获取验证码</span>}
              {!!countDown && (
                <span className="center" style={{ display: 'inline-flex', width: 80 }}>
                  {countDown}
                  s
                </span>
              )}
            </Button>
          </div>
        </Form.Item>
        {/* 新密码 */}
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入登录密码',
            },
            {
              pattern: /^[A-Za-z0-9]{6,18}$/,
              message: '密码不符合要求',
            }]}
        >
          <Input.Password maxLength={18} prefix="密码" placeholder="6-18位字母或数字" />
        </Form.Item>
        {/* 确认新密码 */}
        <Form.Item
          name="password2"
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
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('新密码两次输入的不一致');
              },
            }),
          ]}
        >
          <Input.Password prefix="确认密码" placeholder="6-18位字母或数字" />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} htmlType="submit" type="primary" block>重置密码</Button>
        </Form.Item>
        <Button block type="link">
          <Link to="/user/login">继续登录</Link>
        </Button>
      </Form>

    </div>
  );
};

export default ResetPassword;
