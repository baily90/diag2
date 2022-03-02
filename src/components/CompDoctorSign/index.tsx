import { FunctionComponent } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.less';
import { getSignImg } from '@/store/reducers/reportReducer';
import { RootState } from '@/store';

interface CompDoctorSignProps {
  onSubmit: (values: any) => Promise<void>;
}

const CompDoctorSign: FunctionComponent<CompDoctorSignProps> = ({
  onSubmit,
}) => {
  const dispatch = useDispatch();
  const { signImg } = useSelector((state: RootState) => state.report);
  return (
    <>
      <div className={styles.sign}>
        <div>
          医师签名
          {signImg && (
            <img
              className={styles.signImg}
              src={signImg}
              style={{ border: 0 }}
              alt="签名图片"
            />
          )}
        </div>
        {!signImg && <Button onClick={() => dispatch(getSignImg())}>确认签字</Button>}
      </div>
      <Button size="large" block type="primary" onClick={onSubmit}>
        预览报告
      </Button>
      <div className={styles.tips}>本报告仅供临床参考，不做证明材料</div>
    </>
  );
};

export default CompDoctorSign;
