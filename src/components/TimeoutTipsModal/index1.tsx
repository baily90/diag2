import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { cancleReport, continueReport } from '@/store/reducers/reportReducer';

interface TimeoutTipsModalProps {

}

const TimeoutTipsModal: FunctionComponent<TimeoutTipsModalProps> = () => {
  console.log('TimeoutTipsModal');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { remain_time, check_id, diag_id } = useSelector((state: RootState) => state.report);
  const [tipsVisible, setTipsVisible] = useState(false);
  const [remainTime, setRemainTime] = useState(0);
  const [countDownNum, setCountDownNum] = useState(-1);
  const [nowTime, setNowTime] = useState(Math.round(new Date().getTime() / 1000));
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setRemainTime(remain_time - 50);
  }, [remain_time]);

  useEffect(() => {
    const remainInterval = window.setInterval(() => {
      const currentTime = Math.round(new Date().getTime() / 1000);
      console.log('remain倒计时：', currentTime - nowTime, remainTime);
      if (remainInterval && currentTime - nowTime >= remainTime) {
        clearInterval(remainInterval);
        setTipsVisible(true);
        setCountDownNum(30);
      }
    }, 1000);
    return () => {
      clearInterval(remainInterval);
    };
  }, [remainTime, nowTime]);

  useEffect(() => {
    if (countDownNum >= 0) {
      const thirtySecondsTimer = window.setTimeout(() => {
        console.log('30s倒计时', countDownNum);
        if (countDownNum === 0) {
          clearTimeout(thirtySecondsTimer);
          nextReport();
          console.log('30s倒计时结束');
          return;
        }
        setCountDownNum((count) => count - 1);
      }, 1000);
      setTimer(thirtySecondsTimer);
    }
    return () => clearTimeout(timer);
  }, [countDownNum]);

  const nextReport = async () => {
    await dispatch(cancleReport(diag_id));
    clearTimeout(timer);
    setTipsVisible(false);
    const modal = Modal.warning({
      title: '警告',
      content:
        '由于您处理单个报告已超过10分钟，且未选择继续出报告，系统已将您的报告退回分配列表',
      onOk() {
        navigate('/', { replace: true });
      },
    });
    setTimeout(() => {
      modal.destroy();
      navigate('/', { replace: true });
    }, 3000);
  };

  // 点击继续出具
  const continueToIssue = async () => {
    const { data } = await dispatch(continueReport(diag_id));
    if (data) {
      if (data.check_id === check_id) {
        setRemainTime(data.remain_time - 50);
        setCountDownNum(-1);
        setNowTime(Math.round(new Date().getTime() / 1000));
      } else {
        navigate(`/editReport/${data.check_id}`, { replace: true });
      }
    }
  };
  return (
    <Modal
      closable={false}
      maskClosable={false}
      visible={tipsVisible}
      footer={[
        <Button
          type="primary"
          onClick={() => {
            clearTimeout(timer);
            setTipsVisible(false);
            setCountDownNum(30);
            continueToIssue();
          }}
        >
          继续处理
        </Button>,
      ]}
      width={370}
      zIndex={9999}
    >
      <div className="text">当前报告已处理超过10分钟，是否继续处理</div>
      <div className="tips">
        {countDownNum}
        秒后将报告退回平台，并回到首页
      </div>
      <div />
    </Modal>
  );
};

export default TimeoutTipsModal;
