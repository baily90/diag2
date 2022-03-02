import {
  Button,
  Form, FormInstance, Input, Radio,
} from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface JkjyProps {
  form: FormInstance,
  validateFields: (values: any) => Promise<void>,
}

const Jkjy: FunctionComponent<JkjyProps> = ({
  form,
  validateFields,
}) => {
  const {
    reportConf,
  } = useSelector((state: RootState) => state.report);
  console.log('Jkjy');
  const [healthRemindOptions, setHealthRemindOptions] = useState([]);

  useEffect(() => {
    if (reportConf) {
      const healthRemind = reportConf?.healthRemind || [];
      setHealthRemindOptions(healthRemind);
    }
  }, [reportConf]);

  return (
    <Form
      form={form}
      onFinish={validateFields}
    >
      <Form.Item
        name={['healthRemind', 'id']}
        rules={[{ required: true, message: '请选择健康等级' }]}
      >
        <Radio.Group>
          {healthRemindOptions?.map((option) => (
            <div key={option.id} style={{ marginBottom: 10 }}>
              <Radio key={option.id} value={option.id}>
                <div>{option.levelName}</div>
                <div>{option.content}</div>
                <Form.Item shouldUpdate noStyle>
                  {({ getFieldValue }) => (
                    <Form.Item hidden={getFieldValue(['healthRemind', 'id']) !== option.id} name={['healthRemind', 'remark']}>
                      <Input.TextArea
                        showCount
                        maxLength={200}
                        autoSize={{ minRows: 7 }}
                        placeholder="可输入其他健康建议(限200字)"
                      />
                    </Form.Item>
                  )}
                </Form.Item>
              </Radio>
            </div>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Jkjy;
