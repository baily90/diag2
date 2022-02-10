import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Avatar, Button, Col, Row, Spin,
} from 'antd';
import { CaretDownFilled, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import DropdownButton from '@/components/DropdownButton';

import './index.less';
import { RootState } from '@/store';
import ReportRuleButton from '@/components/ReportRuleButton';

interface ReportLayoutProps {

}

const ReportLayout: FunctionComponent<ReportLayoutProps> = () => {
  console.log('ReportLayout');
  const { base } = useSelector((state: RootState) => state.user);
  // console.log(res);

  return (
    <div className="ReportLayout-container">
      <div className="header">
        <div className="hospitalName">
          明医众禾（青岛附属医院）互联网医院
          <Spin spinning={!base.name}>
            <DropdownButton>
              <Button type="text">
                <Avatar size={25} icon={<UserOutlined />} src={base.avator} />
                <span style={{ color: '#fff', marginLeft: '5px' }}>{base.name}</span>
                <CaretDownFilled style={{ color: '#ffffff' }} />
              </Button>
            </DropdownButton>
          </Spin>
        </div>
        <div className="patientInfo">
          <Row wrap={false} gutter={10}>
            <Col span={2}><span className="label">患者姓名</span></Col>
            <Col span={1}><span className="label">性别</span></Col>
            <Col span={2}><span className="label">年龄</span></Col>
            <Col span={3}><span className="label">检查项目</span></Col>
            <Col span={4}><span className="label">检查时间</span></Col>
          </Row>
          <Row wrap={false} align="bottom" gutter={10}>
            <Col span={2}><span className="value">文刘璀瑶框架哈士大夫</span></Col>
            <Col span={1}><span className="value">女</span></Col>
            <Col span={2}><span className="value">28岁</span></Col>
            <Col span={3}><span className="value">甲状腺检查</span></Col>
            <Col span={4}><span className="value">2020/10/23 13:26:19</span></Col>
            <Col span={1}>
              <ReportRuleButton shape="round" />
            </Col>
          </Row>
        </div>
      </div>
      <div className="report">
        <Outlet />
      </div>
    </div>
  );
};

export default ReportLayout;
