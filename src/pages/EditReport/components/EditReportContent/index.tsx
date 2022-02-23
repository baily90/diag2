import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, message } from 'antd';
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
import { handleReport, nextNeedReport, updateState } from '@/store/reducers/reportReducer';
import { transformSubmitDataConfig } from './formConfig/carotid/csts';
import './index.less';
import { transformData } from '@/components/DynamicForm';
import { useRecordDicomPaint } from '@/components/Dicom/context/recordDicomPaint';
import { useCheckImageContext } from '@/components/Dicom/context/checkImageProvider';
import { sendMarkDataService } from '@/services/report';

interface EditReportContentProps {

}

const EditReportContent: FunctionComponent<EditReportContentProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    body_region_id: type,
    position_info,
    normalData,
    signImg,
    is_danger,
    diag_id,
    check_id,
  } = useSelector((state: RootState) => state.report);

  const { recordDicoms } = useRecordDicomPaint();
  const { checkImages } = useCheckImageContext();

  const [defaultData, setDefaultData] = useState({});

  const [firstLevelActiveKey, setFirstLevelActiveKey] = useState('cssj');
  const [secondLevelActiveKey, setSecondLevelActiveKey] = useState('left');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValue, setFormValue] = useState(null);

  const [formLeft] = Form.useForm();
  const [formRight] = Form.useForm();
  const [formIsthmus] = Form.useForm();
  const [formRemark] = Form.useForm();
  const [formCSTS] = Form.useForm();
  const [formJKJY] = Form.useForm();

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

  const validateCSSJFields = async () => {
    try {
      await formLeft.validateFields();
      try {
        await formRight.validateFields();
        try {
          await formCSTS.validateFields();
          try {
            await formJKJY.validateFields();

            if (signImg) {
              const data = {};
              let { cs_tip_des, cs_tips } = formCSTS.getFieldsValue();
              cs_tips = transformData(
                formCSTS.getFieldsValue(),
                transformSubmitDataConfig,
              ).cs_tips;
              cs_tips = cs_tips.filter((item: any) => !!item);

              _.merge(
                data,
                formLeft.getFieldsValue(),
                formRight.getFieldsValue(),
                formRemark.getFieldsValue(),
                formJKJY.getFieldsValue(),
                { cs_tip_des, cs_tips },
              );
              if (checkImages.length !== 4) {
                message.warning('报告中需要4张图片发送给患者');
                return;
              }
              setFormValue(data);
              setIsModalVisible(true);
              console.log('验证通过，预览报告', data);
            } else {
              message.warning('请先确认签名');
            }
            setFirstLevelActiveKey('ysqm');
          } catch (error) {
            setFirstLevelActiveKey('jkjy');
          }
        } catch (error) {
          setFirstLevelActiveKey('csts');
        }
      } catch (error) {
        setFirstLevelActiveKey('cssj');
        setSecondLevelActiveKey('right');
      }
    } catch (error) {
      setFirstLevelActiveKey('cssj');
      setSecondLevelActiveKey('left');
    }
  };

  const renderForm = () => {
    switch (type) {
      case 1:
        return (
          <Thyroid
            forms={[formLeft, formRight, formIsthmus, formRemark, formCSTS, formJKJY]}
            normalData={normalData}
            firstLevelActiveKey={firstLevelActiveKey}
            setFirstLevelActiveKey={setFirstLevelActiveKey}
            secondLevelActiveKey={secondLevelActiveKey}
            setSecondLevelActiveKey={setSecondLevelActiveKey}
            validateCSSJFields={validateCSSJFields}
          />
        );
      case 2:
        return (
          <Carotid
            defaultData={defaultData}
            normalData={normalData}
            forms={[formLeft, formRight, formRemark, formCSTS, formJKJY]}
            firstLevelActiveKey={firstLevelActiveKey}
            setFirstLevelActiveKey={setFirstLevelActiveKey}
            secondLevelActiveKey={secondLevelActiveKey}
            setSecondLevelActiveKey={setSecondLevelActiveKey}
            validateCSSJFields={validateCSSJFields}
          />
        );
      case 3:
        return <LiverCourage />;
      case 4:
      case 5:
        return <Universal />;
      case 6:
        return <Breast />;
      case 7:
        return <Mesareic />;
      default:
        return null;
    }
  };

  /**
   * 发送报告
   */
  const handleOk = async () => {
    // 发送标注信息
    const mark_data = recordDicoms.map((item) => item.dicomState.toJSON(item.app));
    sendMarkDataService({ diag_id, mark_data });

    // 提交报告
    const { code } = await dispatch(handleReport({
      diag_id,
      is_danger,
      ...formValue,
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

  return (
    <div className="editReport-content">
      {renderForm()}
      <PreviewReportModal
        isModalVisible={isModalVisible}
        formValue={formValue}
        handleOk={handleOk}
        handleCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default EditReportContent;
