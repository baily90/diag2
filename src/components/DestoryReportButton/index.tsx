import {
  Button, Form, Input, message, Modal, Select,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import parseInt from 'lodash/parseInt';
import { RootState } from '@/store';
import { destroyReport, getDestroyType } from '@/store/reducers/reportReducer';

interface DestoryReportButtonProps {

}

const DestoryReportButton: FunctionComponent<DestoryReportButtonProps> = () => {
  console.log('DestoryReportButton');
  const { id } = useParams();
  const dispatch = useDispatch();
  const [form] = useForm();
  const navigate = useNavigate();

  const { destoryTypes } = useSelector((state: RootState) => state.report);

  const [isModalVisible, setIsModalVisible] = useState(false);
  // 备注项是否必填
  const [isRemarkRequired, setIsRemarkRequired] = useState(false);
  const [options, setOptions] = useState();

  useEffect(() => {
    dispatch(getDestroyType());
  }, []);

  useEffect(() => {
    const temp = destoryTypes.map((item) => ({
      label: item.title,
      value: item.id,
    }));
    setOptions(temp);
  }, [destoryTypes]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = () => {
    form.validateFields().then(async (res) => {
      const { data } = await dispatch(destroyReport({ ...res }));
      if (data?.id && data?.id !== parseInt(id)) {
        navigate(`/editReport/${data.id}`, { replace: true });
      } else {
        message.info('已经没有报告了');
      }
    });
  };

  /**
  * 动态设置备注输入框是否必填
  * 当选择其他时，备注项必填
  * @param changedValues
  * @param allValues
  */
  const onValuesChange = (
    changedValues: any,
    allValues: { nullify_map_id: unknown; mark: unknown },
  ) => {
    const { nullify_map_id } = allValues;
    const label = options.filter(
      (item) => item.value === nullify_map_id,
    )[0]?.label;
    setIsRemarkRequired(label === '其他');
  };

  return (
    <>
      <Button className="btn-normal" onClick={showModal}>作废报告</Button>
      <Modal
        title="作废报告"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={() => form.resetFields()}
        footer={[
          <Button
            type="primary"
            onClick={onFinish}
          >
            提交
          </Button>,
        ]}
      >
        <Form
          name="basic"
          labelAlign="left"
          form={form}
          onValuesChange={onValuesChange}
        >
          <Form.Item hidden name="check_id" initialValue={id}>
            <Input />
          </Form.Item>
          <Form.Item
            label="作废类型"
            name="nullify_map_id"
            rules={[{ required: true, message: '请选择作废类型' }]}
          >
            <Select placeholder="请选择作废类型" options={options} />
          </Form.Item>
          <Form.Item
            label="备注"
            name="mark"
            rules={[{ required: isRemarkRequired, message: '请输入作废原因' }]}
          >
            <Input.TextArea
              placeholder={`50字以内的作废原因（${isRemarkRequired ? '必填' : '选填'
              }）`}
            />
          </Form.Item>
          {/* <Form.Item /> */}
        </Form>
      </Modal>
    </>
  );
};

export default DestoryReportButton;
