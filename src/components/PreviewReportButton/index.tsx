import { Button, message, Modal } from 'antd';
import { BaseButtonProps } from 'antd/lib/button/button';
import { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import parseInt from 'lodash/parseInt';
import { useNavigate } from 'react-router-dom';
import { sendMarkDataService } from '@/services/report';
import { useCheckImageContext } from '../Dicom/context/checkImageProvider';
import { useRecordDicomPaint } from '../Dicom/context/recordDicomPaint';
import { handleReport, nextNeedReport } from '@/store/reducers/reportReducer';
import { RootState } from '@/store';

interface PreviewReportButtonProps extends BaseButtonProps{
  buttonText?: string
}

const PreviewReportButton: FunctionComponent<PreviewReportButtonProps> = ({
  buttonText = '预览报告',
  ...otherProps
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { recordDicoms } = useRecordDicomPaint();
  const { checkImages } = useCheckImageContext();
  const { is_danger, diag_id, check_id } = useSelector((state: RootState) => state.report);

  const showModal = () => {
    setIsModalVisible(true);
  };

  /**
   * 发送报告
   */
  const handleOk = async () => {
    // 验证报告 code here...
    if (checkImages.length !== 4) {
      message.warning('报告中需要4张图片发送给患者');
      return;
    }
    // 发送标注信息
    const mark_data = recordDicoms.map((item) => item.dicomState.toJSON(item.app));
    sendMarkDataService({ diag_id, mark_data });

    // 提交报告
    const { code } = await dispatch(handleReport({
      diag_id,
      is_danger,
      // ...formValue,
      sources: checkImages,
    }));
    if (code === 200) {
      // 下一份报告
      const { data } = await dispatch(nextNeedReport(check_id));
      if (data?.id && data.id !== check_id) {
        navigate(`/editReport/${data.id}`, { replace: true });
      } else {
        message.info('已经没有报告了');
      }
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button type="primary" {...otherProps} onClick={showModal}>
        {buttonText}
      </Button>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="发送报告"
        cancelText="返回编辑"
        destroyOnClose
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default PreviewReportButton;
