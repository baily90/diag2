import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, message, Modal, Tabs,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import CompDoctorSign from '@/components/CompDoctorSign';
import Jkjy from './components/Jkjy';
import Cssj from './components/Cssj';
import Csts from './components/Csts';
import Preview from './components/Preview';
import { useCheckImageContext } from '@/components/Dicom/context/checkImageProvider';
import { useRecordDicomPaint } from '@/components/Dicom/context/recordDicomPaint';
import { sendMarkDataService } from '@/services/report';
import { nextNeedReport, submitReport } from '@/store/reducers/reportReducer';

interface UniversalProps {

}

const Universal: FunctionComponent<UniversalProps> = () => {
  console.log('Universal');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState();
  const [previewData, setPreviewData] = useState();
  const [firstLevelActiveKey, setFirstLevelActiveKey] = useState('cssj');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { checkImages } = useCheckImageContext();
  const [formJKJY] = useForm();
  const [formCSTS] = useForm();
  const [formCSSJ] = useForm();
  const { recordDicoms } = useRecordDicomPaint();
  const {
    check_id,
    diag_id,
    is_danger,
    reportConf,
    signImg,
  } = useSelector((state: RootState) => state.report);

  useEffect(() => {
    if (reportConf) {
      console.log(reportConf);
    }
  }, [reportConf]);

  const validateFields = async (values) => {
    console.log('validateFields', values);
    try {
      await formCSSJ.validateFields();
      try {
        await formCSTS.validateFields();
        try {
          await formJKJY.validateFields();
          if (signImg) {
            const data = {};
            let { cssj } = formCSSJ.getFieldsValue();
            cssj = cssj.filter((item: any) => !!item);
            const { csts_checkbox, csts } = formCSTS.getFieldsValue();
            const temp = csts_checkbox.map((id: number) => csts?.filter((item) => item?.id === id)?.[0]);
            _.merge(
              data,
              { cssj },
              { csts: temp },
              formJKJY.getFieldsValue(),
            );
            if (checkImages.length !== 4) {
              message.warning('报告中需要4张图片发送给患者');
              return;
            }
            setPreviewData(data);
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
      console.log(error);
      const { errorFields } = error;
      setActiveKey(`${errorFields[0].name[1]}`);
      setFirstLevelActiveKey('cssj');
    }
  };

  const extraOperations = (
    <Button type="primary" onClick={validateFields}>
      预览报告
    </Button>
  );
  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      // 发送标注信息
      const mark_data = recordDicoms.map((item) => item.dicomState.toJSON(item.app));
      sendMarkDataService({ diag_id, mark_data });
      // 提交报告
      const { code } = await dispatch(submitReport({
        id: check_id,
        diag_id,
        is_danger,
        ...previewData,
        source: checkImages,
      }));
      if (code === 0) {
        setConfirmLoading(false);
        // 下一份报告
        const { data } = await dispatch(nextNeedReport(check_id));
        if (data?.id && data.id !== check_id) {
          navigate(`/editReport/${data.id}`, { replace: true });
        } else {
          message.info('已经没有报告了');
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
    <>
      <Tabs
        onChange={(activeKey) => setFirstLevelActiveKey(activeKey)}
        activeKey={firstLevelActiveKey}
        tabBarExtraContent={extraOperations}
        size="large"
      >
        <Tabs.TabPane tab="超声所见" key="cssj" forceRender>
          <Cssj
            form={formCSSJ}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            validateFields={validateFields}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="超声提示" key="csts" forceRender>
          <Csts
            form={formCSTS}
            validateFields={validateFields}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="健康建议" key="jkjy" forceRender>
          <Jkjy
            form={formJKJY}
            validateFields={validateFields}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="医生签名" key="ysqm" forceRender>
          <CompDoctorSign
            onSubmit={validateFields}
          />
        </Tabs.TabPane>
      </Tabs>
      <Preview
        confirmLoading={confirmLoading}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={() => setIsModalVisible(false)}
        previewData={previewData}
      />
    </>
  );
};

export default Universal;
