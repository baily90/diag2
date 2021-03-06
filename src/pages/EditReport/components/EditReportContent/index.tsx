import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import PreviewReportModal from '@/components/PreviewReportModal';
import { RootState } from '@/store';
import Thyroid from './position/Thyroid';
import Carotid from './position/Carotid';
import LiverCourage from './position/LiverCourage';
import Universal from './position/Universal';
import Breast from './position/Breast';
import Mesareic from './position/Mesareic';
import {
  getMesareicTemplateData, handleReport, nextNeedReport, updateState,
} from '@/store/reducers/reportReducer';
import { useRecordDicomPaint } from '@/components/Dicom/context/recordDicomPaint';
import { useCheckImageContext } from '@/components/Dicom/context/checkImageProvider';
import { sendMarkDataService } from '@/services/report';
import './index.less';

interface EditReportContentProps {

}

const EditReportContent: FunctionComponent<EditReportContentProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    body_region_id: type,
    position_info,
    normalData,
    is_danger,
    diag_id,
    check_id,
  } = useSelector((state: RootState) => state.report);

  const { recordDicoms } = useRecordDicomPaint();
  const { checkImages } = useCheckImageContext();
  const [defaultData, setDefaultData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValue, setFormValue] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (diag_id && type === 7) {
      dispatch(getMesareicTemplateData(diag_id));
    }
  }, [diag_id, type]);

  useEffect(() => {
    const { left, right } = position_info;
    setDefaultData({
      tabs: {
        left: {
          intimal_thickness: left,
        },
        right: {
          intimal_thickness: right,
        },
      },
    });
  }, [position_info]);

  const getReportData = (data) => {
    if (checkImages.length !== 4) {
      message.warning('???????????????4????????????????????????');
      return;
    }
    setFormValue(data);
    setIsModalVisible(true);
  };

  /**
   * ???????????????body_region_id???4???5???????????????????????????????????????????????????????????????????????????????????????
   * ???????????????????????????????????????????????????????????????????????????<Universal />????????????
   * ?????????????????????????????????????????????
   * @returns
   */
  const renderForm = () => {
    switch (type) {
      case 1:
        return (
          <Thyroid
            normalData={normalData}
            getReportData={getReportData}
          />
        );
      case 2:
        return (
          <Carotid
            defaultData={defaultData}
            normalData={normalData}
            getReportData={getReportData}
          />
        );
      case 3:
        return (
          <LiverCourage
            normalData={normalData}
            getReportData={getReportData}
          />
        );
      case 4:
      case 5:
        return <Universal />;
      case 6:
        return (
          <Breast
            normalData={normalData}
            getReportData={getReportData}
          />
        );
      case 7:
        return (
          <Mesareic
            getReportData={getReportData}
          />
        );
      default:
        return null;
    }
  };

  /**
   * ????????????
   */
  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      // ??????????????????
      const mark_data = recordDicoms.map((item) => item.dicomState.toJSON(item.app));
      sendMarkDataService({ diag_id, mark_data });

      // ????????????
      const { code } = await dispatch(handleReport({
        diag_id,
        is_danger,
        ...formValue,
        sources: checkImages,
      }));
      if (code === 200) {
        setConfirmLoading(false);
        // ???????????????
        const { data } = await dispatch(nextNeedReport(check_id));
        if (data?.id && data.id !== check_id) {
          navigate(`/editReport/${data.id}`, { replace: true });
        } else {
          message.info('?????????????????????');
        }
        setIsModalVisible(false);
      } else {
        setConfirmLoading(false);
      }
    } catch (error) {
      setConfirmLoading(false);
    }
  };

  return (
    <div className="editReport-content">
      {renderForm()}
      <PreviewReportModal
        confirmLoading={confirmLoading}
        isModalVisible={isModalVisible}
        formValue={formValue}
        handleOk={handleOk}
        handleCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default EditReportContent;
