import { CaretDownFilled, UserOutlined } from '@ant-design/icons';
import {
  Avatar, Button, Col, Row, Skeleton, Spin,
} from 'antd';
import { FunctionComponent } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import DropdownButton from '@/components/DropdownButton';
import { RootState } from '@/store';
import { AgeUnitEnum, GenderEnum } from '@/types/patient';
import ReportRuleButton from '@/components/ReportRuleButton';
import DangerCheckbox from '@/components/DangerCheckbox';
import DestoryReportButton from '@/components/DestoryReportButton';
import './index.less';

interface ReportHeaderProps {

}

const ReportHeader: FunctionComponent<ReportHeaderProps> = () => {
  console.log('ReportHeader');
  const { base } = useSelector((state: RootState) => state.user);
  const {
    patient,
    is_loading,
    is_history,
    is_withdraw,
    is_danger,
    body_region_id,
    patientReport,
    nullifyAccess,
  } = useSelector((state: RootState) => state.report);
  /**
     * 时间戳格式化
     * @param val 10位时间戳
     */
  const formatDateTime = (val: number) => {
    if (!val) return '';
    return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
  };

  return (
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
        <Skeleton active loading={is_loading}>
          <Row wrap={false} align="bottom" gutter={10}>
            <Col span={2}><span className="value">{patient.name}</span></Col>
            <Col span={1}><span className="value">{GenderEnum[patient.gender]}</span></Col>
            <Col span={2}>
              <span className="value">
                {patient.age}
                {AgeUnitEnum[patient.age_unit]}
              </span>
            </Col>
            <Col span={3}><span className="value">{patient.product_name}</span></Col>
            <Col span={4}><span className="value">{formatDateTime(patient.create_time)}</span></Col>
            {/* 疑难报告 */}
            {
              ((!is_history && !is_withdraw)
                || (is_history && is_danger)) && (
                <Col>
                  <DangerCheckbox />
                </Col>
              )
            }
            {/* 全部正常-通用、肠系膜淋巴结部位并且报告详情 不显示全部正常按钮 */}
            {![4, 5, 7].includes(body_region_id) && !is_history && (
              <Col>
                <Button
                  className="btn-normal"
                // onClick={onkeyNormal}
                >
                  全部正常
                </Button>
              </Col>
            )}
            {/* 患者历史病例 */}
            {patientReport === 1 && (
              <Col>
                <Button
                  className="btn-normal"
                // loading={isLoading}
                // onClick={showPatienCase}
                >
                  历史病例
                </Button>
              </Col>
            )}
            {/* 作废报告 */}
            {nullifyAccess === 1 && !is_history && (
              <Col>
                <DestoryReportButton />
              </Col>
            )}
            {/* 报告出具规则 */}
            <Col>
              <ReportRuleButton shape="round" />
            </Col>
          </Row>
        </Skeleton>

      </div>
    </div>
  );
};

export default ReportHeader;
