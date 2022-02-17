import {
  Button,
  Layout, Menu,
} from 'antd';
import { FunctionComponent } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { CaretDownFilled, SettingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ReportRuleButton from '@/components/ReportRuleButton';
import DropdownButton from '@/components/DropdownButton';
import './index.less';
import { RootState } from '@/store';

const {
  Sider, Content,
} = Layout;

interface BasicLayoutProps {

}

const BasicLayout: FunctionComponent<BasicLayoutProps> = () => {
  console.log('BasicLayout');
  const { base } = useSelector((state: RootState) => state.user);
  return (
    <Layout className="site-layout">
      <Sider>
        <DropdownButton position="sidebar">
          <Button type="text" style={{ margin: '40px 0 10px 10px', color: '#fff' }}>
            <SettingOutlined />
            <span className="userName">{base.name}</span>
            <CaretDownFilled style={{ color: '#ffffff' }} />
          </Button>
        </DropdownButton>
        <Menu
          theme="dark"
          // defaultSelectedKeys={['1']}
          mode="inline"
        >
          <Menu.Item key="home">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="historyReport">
            <Link to="/historyReport">历史报告</Link>
          </Menu.Item>
        </Menu>
        <div className="rulesButton">
          <ReportRuleButton shape="round" type="primary" />
        </div>
      </Sider>
      <Content className="site-content">
        <Outlet />
        <div className="site-content-copyright">
          Copyright @ 深至科技诊断医师平台
        </div>
      </Content>
    </Layout>
  );
};

export default BasicLayout;
