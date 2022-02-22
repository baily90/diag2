import { Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from '@/utils/hooks';
import { withdrawReport } from '@/store/reducers/historyReportReducer';

export interface OperateProps {
  record: any,
  actions: any
}

const Operate: FunctionComponent<OperateProps> = ({ record, actions }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const detail = () => {
    const { id } = record;
    navigate(`/historyReportDetails/${id}`);
  };
  const withdraw = () => {
    const { id } = record;
    try {
      const modal = useConfirm({
        content: '撤回后报告需重新出具',
        okText: '确认出具',
      }, async () => {
        const { code, data } = await dispatch(withdrawReport(id));
        if (code === 200) {
          const { is_check, check_id } = data;
          if (is_check) {
            navigate(`/editReport/${check_id}`, { replace: true });
          } else {
            modal.destroy();
            useConfirm({
              content: '撤回失败，已有撤回报告待出具请出具上份撤回的报告后再撤回',
              okText: '出具报告',
            }, () => {
              navigate(`/editReport/${check_id}`, { replace: true });
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handler = (item) => {
    switch (item.code) {
      case 'detail':
        detail();
        break;
      case 'withdraw':
        withdraw();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {
        actions.map((item) => (
          <Button
            style={{ marginRight: 10 }}
            key={item.code}
            onClick={() => handler(item)}
            type={item.type}
          >
            {item.name}
          </Button>
        ))
      }
    </>
  );
};

export default Operate;
