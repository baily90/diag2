import {
  Button, Card, Col, Row, Spin,
} from 'antd';
import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dealReport, getHomeInfo } from '@/store/reducers/homeReducer';
import './index.less';
import { RootState } from '@/store';

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    count2, count4, count5, count6,
  } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    dispatch(getHomeInfo());
  }, []);

  const handleGo2EditReport = async () => {
    const { id } = await dispatch(dealReport());
    navigate(`/editReport/${id}`);
  };
  return (
    <div className="home-container">
      <Card style={{ width: '80%', padding: 20, margin: '50px auto 0' }}>
        <div className="center">
          <div className="need2DealBox">
            已有
            {' '}
            <span>
              {count2}
            </span>
            {' '}
            份报告等待处理
          </div>
          <div className="btn-wrap">
            <Button shape="round" size="large" block onClick={handleGo2EditReport}>继续处理</Button>
          </div>
        </div>
      </Card>
      <Row gutter={10} style={{ width: '80%', margin: '20px auto 0' }}>
        <Col span={8}>
          <Card className="center" bordered={false}>
            <div className="center">{count6}</div>
            <div className="label">今日已处理报告数</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="center" bordered={false}>
            <div className="center">{count4}</div>
            <div className="label">本月累计报告数</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="center" bordered={false}>
            <div className="center">{count5}</div>
            <div className="label">累计全部报告数</div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
