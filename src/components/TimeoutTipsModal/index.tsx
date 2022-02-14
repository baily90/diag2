import { Button, Modal } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import parseInt from 'lodash/parseInt';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { cancleReport, continueReport } from '@/store/reducers/reportReducer';

interface TimeoutTipsModalProps {

}

const TimeoutTipsModal: FunctionComponent<TimeoutTipsModalProps> = () => {
  console.log('TimeoutTipsModal');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { remain_time, check_id, diag_id } = useSelector((state: RootState) => state.report);
  console.log(diag_id);

  // 设置超时时间接口下发 正常10分钟，由于到点还需要倒计时30秒，防止服务端比前端早所以这里提前30秒弹窗
  let intervalNum: number; // 10分钟定时器的标记
  let [tenInterval, setTenInterval] = useState<number>(); // 30秒定时器的标记
  const [tipsVisible, setTipsVisible] = useState<any>(false); // 弹框是否显示
  const [countDownNum, setCountDownNum] = useState<any>(30); // 倒计时数

  const [nowTime, setNowTime] = useState<number>(
    Math.round(new Date().getTime() / 1000),
  );

  const [timerOut, setTimerOut] = useState(0);

  useEffect(() => {
    // setTimerOut(remain_time - 50);
    setTimerOut(10);
  }, [remain_time]);

  // 计时
  useEffect(() => {
    if (nowTime && !intervalNum && remain_time) {
      intervalNum = window.setInterval(runInterval, 1000);
    }
    return () => {
      window.clearInterval(intervalNum);
      window.clearInterval(tenInterval);
    };
  }, [nowTime, timerOut]);

  // 运行倒计时
  const runInterval = () => {
    const currentTime = Math.round(new Date().getTime() / 1000); // 更新当前时间
    console.log(`${timerOut}倒计时：${currentTime - nowTime}`);
    if (currentTime - nowTime > timerOut) {
      // 判断是否超时
      window.clearInterval(intervalNum);
      // 显示弹框
      setTipsVisible(true);
      // 触发30秒倒计时
      countDownTime();
    }
  };

  // 倒计时30秒
  const countDownTime = () => {
    let num = 30;
    tenInterval = window.setInterval(async () => {
      num--;
      setCountDownNum(num);
      console.log(`30s倒计时：${num}`, diag_id);
      if (num === 0) {
        await dispatch(cancleReport(diag_id));
        window.clearInterval(tenInterval);
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
      }
    }, 1000);
    setTenInterval(tenInterval);
  };

  // 点击继续出具
  const continueToIssue = async () => {
    const { data } = await dispatch(continueReport(diag_id));
    if (data) {
      if (data.check_id === check_id) {
        setTimerOut(data.remain_time - 50);
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
            window.clearInterval(tenInterval);
            setTipsVisible(false);
            setCountDownNum(30);
            continueToIssue();
          }}
        >
          继续处理
        </Button>,
      ]}
      width={370}
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
