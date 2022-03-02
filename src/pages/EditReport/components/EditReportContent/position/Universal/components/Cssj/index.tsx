import {
  Button,
  Dropdown,
  Form, FormInstance, Input, Menu, Tabs,
} from 'antd';
import {
  Dispatch, FunctionComponent, SetStateAction, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { RootState } from '@/store';

interface CssjProps {
  form: FormInstance,
  validateFields: (values: any) => Promise<void>,
  activeKey: string,
  setActiveKey: Dispatch<SetStateAction<undefined>>
}

const Cssj: FunctionComponent<CssjProps> = ({
  form,
  validateFields,
  activeKey,
  setActiveKey,
}) => {
  console.log('Cssj');
  const {
    reportConf,
  } = useSelector((state: RootState) => state.report);
  // const [activeKey, setActiveKey] = useState();
  const [cssjOptions, setCssjOptions] = useState([]);

  useEffect(() => {
    if (reportConf) {
      const cssj = reportConf?.cssj || [];
      setCssjOptions(cssj);
      console.log(cssj);
    }
  }, [reportConf]);

  const onFinishFailed = ({ values, errorFields, outOfDate }) => {
    setActiveKey(`${errorFields[0].name[1]}`);
  };

  const onTabsChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  const onMenuItemClick = (opt: string) => {
    const formValues = form.getFieldsValue();
    let content = _.get(formValues, `cssj[${activeKey}].content`, '');
    if (content) {
      content += '，';
    }
    content += opt;
    _.set(formValues, `cssj[${activeKey}].content`, content);
    form.setFieldsValue(formValues);
  };

  const getMenu = (option) => (
    <Menu style={{ width: 300 }}>
      {
          option.map((opt) => (
            <Menu.Item key={opt} onClick={() => onMenuItemClick(opt)}>
              <div style={{
                display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'space-between',
              }}
              >
                <div
                  style={{
                    width: '200px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {opt}
                </div>
                <Button type="link">填入</Button>
              </div>

            </Menu.Item>
          ))
        }
    </Menu>
  );

  return (
    <Form
      form={form}
      onFinish={validateFields}
      onFinishFailed={onFinishFailed}
    >
      <Tabs
        onChange={onTabsChange}
        activeKey={activeKey}
      >
        {
          cssjOptions?.map((option) => (
            <Tabs.TabPane tab={option.name || ''} key={option.id} forceRender>
              {!!option?.option?.length && (
                <Dropdown
                  overlay={getMenu(option.option)}
                  trigger={['click']}
                  arrow
                  placement="bottomCenter"
                >
                  <Button style={{ marginBottom: 10 }}>快捷选项</Button>
                </Dropdown>
              )}
              <Form.Item hidden initialValue={option.id} name={['cssj', option.id, 'id']}>
                <Input />
              </Form.Item>
              <Form.Item hidden initialValue={option.name} name={['cssj', option.id, 'name']}>
                <Input />
              </Form.Item>
              <Form.Item
                name={['cssj', option.id, 'content']}
                rules={[
                  { required: true, message: '请输入超声所见内容' },
                  { max: 200, message: '限200字' }]}
              >
                <Input.TextArea
                  showCount
                  maxLength={200}
                  autoSize={{ minRows: 7 }}
                  placeholder="请输入超声所见内容(限200字)"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  下一步
                </Button>
              </Form.Item>
            </Tabs.TabPane>
          ))
        }
      </Tabs>
    </Form>
  );
};

export default Cssj;
