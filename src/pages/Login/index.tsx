import {
  Button, Checkbox, Form, Input, message,
} from 'antd';
import { FunctionComponent, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'antd/lib/form/Form';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';
import { passwordStorage, tokenStorage } from '@/utils/storage';
import iconLogin from '@/assets/images/icon_login.png';
import { getCaptcha, login } from '@/store/reducers/loginReducer';
import { RootState } from '@/store';
import './index.less';

interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [form] = useForm();
  const redirect = location?.state?.redirect?.pathname || '/';
  const {
    base64, code, sign,
  } = useSelector((state: RootState) => state.login);

  const getCaptchaImage = () => {
    dispatch(getCaptcha());
  };

  useEffect(() => {
    getCaptchaImage();
  }, []);

  useEffect(() => {
    const phone = passwordStorage.getItem('phone') || '';
    const aesPassword = passwordStorage.getItem('password');
    if (phone) {
      const password = CryptoJS.AES.decrypt(aesPassword, 'diagnosis').toString(
        CryptoJS.enc.Utf8,
      );
      form.setFieldsValue({ phone, password, isRemberPassword: true });
    }
  }, [form]);

  const onFinish = async (values) => {
    const {
      phone, password, captcha, isRemberPassword,
    } = values;

    const { code, data, msg } = await dispatch(login({
      phone, password, captcha, sign,
    }));
    if (code === 200) {
      tokenStorage.clear();
      tokenStorage.setItem(data.name, data.token);
      tokenStorage.setItem('token', data.token);
      // 记住、取消记住密码
      if (isRemberPassword) {
        passwordStorage.setItem('phone', phone);
        const aesPassword = CryptoJS.AES.encrypt(
          password,
          'diagnosis',
        ).toString();
        passwordStorage.setItem('password', aesPassword);
      } else {
        passwordStorage.clear();
      }
      message.success(msg);
      setTimeout(() => {
        navigate(redirect, { replace: true });
      });
    } else {
      getCaptchaImage();
    }
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
        <Form.Item
          name="phone"
          rules={[{ required: true, message: '请输入手机号' },
            { pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/, message: '请输入正确的手机号' }]}
        >
          <Input maxLength={11} prefix={<UserOutlined />} placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入登录密码' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="请输入登录密码" />
        </Form.Item>
        <Form.Item
          style={{ display: 'inline-flex', flex: 1 }}
          name="captcha"
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <Input maxLength={4} placeholder="请输入验证码" />
        </Form.Item>
        <div
          style={{
            display: 'inline-flex', marginLeft: 10, width: 150, height: 40,
          }}
        >
          <img onClick={() => dispatch(getCaptcha())} src={base64} alt="" />
        </div>
        <Form.Item>
          <Form.Item name="isRemberPassword" valuePropName="checked" noStyle>
            <Checkbox style={{ float: 'left' }}>记住密码</Checkbox>
          </Form.Item>
          <Link style={{ float: 'right' }} to="/user/resetPassword">忘记密码</Link>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" block>登录</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
