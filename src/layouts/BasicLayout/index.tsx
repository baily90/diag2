import {
  Button, Layout, Menu,
} from 'antd';
import { FunctionComponent } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { CaretDownFilled } from '@ant-design/icons';
import ReportRuleButton from '@/components/ReportRuleButton';
import DropdownButton from '@/components/DropdownButton';
import './index.less';

const {
  Sider, Content,
} = Layout;

interface BasicLayoutProps {

}

const BasicLayout: FunctionComponent<BasicLayoutProps> = () => {
  console.log('BasicLayout');
  return (
    <Layout className="site-layout">
      <Sider>
        <DropdownButton>
          <Button>
            设置
            <CaretDownFilled />
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
        <ReportRuleButton shape="round" />
      </Sider>
      <Content className="site-content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default BasicLayout;
