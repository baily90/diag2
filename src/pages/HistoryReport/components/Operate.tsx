import { Button, Modal } from 'antd';
// import { useDispatch, useSelector } from 'umi';
import { useDispatch, useSelector } from 'react-redux';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from '@/utils/hooks';

export interface OperateProps {
  record: any,
  actions: any
}

const Operate: FunctionComponent<OperateProps> = ({ record, actions }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { searchParams } = useSelector(({ autoTest }: any) => ({ ...autoTest }));

  const detail = () => {
    const { id } = record;
    navigate(`/historyReportDetails/${id}`);
  };
  const cancle = () => {
    useConfirm('撤回后报告需重新出具', () => {
      // code here
      console.log('撤回');
    });
  };

  const handler = (item) => {
    switch (item.code) {
      case 'detail':
        detail();
        break;
      case 'cancle':
        cancle();
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
