import { FunctionComponent } from 'react';
import {
  useSelector, useDispatch,
} from 'react-redux';
import { Button } from 'antd';
import { increment, asyncIncrement } from '@/store/reducers/counterSlice'; // 引入actions

interface NotFoundProps {

}

const NotFound: FunctionComponent<NotFoundProps> = () => {
  console.log('NotFound');
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <>
      NotFound
      {count}
      <Button onClick={
        () => {
          dispatch(increment({ step: 2 }));
        }
      }
      >
        increment
      </Button>
      <Button onClick={
        () => {
          dispatch(asyncIncrement({ step: 1 }));
        }
      }
      >
        asyncIncrement
      </Button>
    </>
  );
};

export default NotFound;
