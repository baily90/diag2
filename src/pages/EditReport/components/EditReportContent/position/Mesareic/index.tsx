import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Tabs, Form, Button, message, Menu, Dropdown,
} from 'antd';
import _ from 'lodash';
import CompDoctorSign from '@/components/CompDoctorSign';
import DynamicForm from '@/components/DynamicForm';
import { cssj, csts, jkjy } from '../../formConfig/mesareic';
import { submitType } from '@/types/formField';
import styles from '../index.module.less';

const { TabPane } = Tabs;

interface UniversalProps {

}

const Universal: FunctionComponent<UniversalProps> = () => {
  const [formCSSJ] = Form.useForm();
  const [formCSTS] = Form.useForm();
  const [formJKJY] = Form.useForm();

  const [firstLevelActiveKey, setFirstLevelActiveKey] = useState('cssj');

  const [signImg, setSignImg] = useState();

  useEffect(() => {
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handler = (e: any) => {
    if (e.origin !== origin) return;
    console.log('mesFromReact', e?.data);
    const { type, data } = e?.data;
    if (type === 'getSignImg') {
      setSignImg(data?.url);
    } else if (type === 'setTemplate') {
      // 1-肠系膜未见明显淋巴结回声, 2-淋巴结肿大, 3-淋巴结可见
      formJKJY.resetFields();
      const { cssj } = formCSSJ.getFieldsValue();
      let { cs_tips } = formCSTS.getFieldsValue();
      let cssj_text = '';
      if (cssj) {
        cssj_text += cssj;
      }
      cssj_text
        += data === 1
          ? '脐周未探及明显淋巴结回声。'
          : data === 3
            ? '脐周可探及数枚低回声结节，大者约 * mm，形态规则，呈椭圆形，包膜光整，回声均匀，边界清，可/未见淋巴门。'
            : data === 2
              ? '脐周可探及数枚低回声结节，大者约 * mm，形态规则，呈椭圆形，包膜光整，回声均匀，边界清，可/未见淋巴门。'
              : '';

      formCSSJ.setFieldsValue({ cssj: `${cssj_text}` });

      const csts = data === 1 ? 1 : data === 3 ? 2 : data === 2 ? 3 : '';
      if (cs_tips) {
        if (!cs_tips.includes(csts)) {
          cs_tips?.push(csts);
        }
      } else {
        cs_tips = [csts];
      }
      formCSTS.setFieldsValue({ cs_tips });
      const health_proposal = data === 1 ? 0 : data === 3 ? 1 : data === 2 ? 2 : '';
      formJKJY.setFieldsValue({ health_proposal });
    }
  };

  /**
   * 校验器
   * 所有校验通过通知父窗口预览报告
   */
  const validateCSSJFields = async () => {
    try {
      await formCSSJ.validateFields();
      try {
        await formCSTS.validateFields();
        try {
          await formJKJY.validateFields();

          if (signImg) {
            const data = {};
            let { cs_tip_des, cs_tips } = formCSTS.getFieldsValue();

            const test = _.cloneDeep(cs_tips);
            const index = test?.indexOf('other');
            if (index !== -1) {
              test.splice(index, 1);
            }
            cs_tips = cs_tips.filter((item: any) => !!item);
            _.merge(
              data,
              formCSSJ.getFieldsValue(),
              formJKJY.getFieldsValue(),
              { cs_tip_des, cs_tips: test },
            );
            window.parent
              && window.parent.postMessage({ type: 'previewReport', data }, '*');
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
    }
  };

  const onFormCSSJConfirm = (...args: submitType) => {
    const [value, suc, error] = args;
    console.log(value, suc, error);
    validateCSSJFields();
    suc();
  };

  const onFormCSTSConfirm = (...args: submitType) => {
    const [value, suc, error] = args;
    console.log(value, suc, error);
    validateCSSJFields();
    suc();
  };

  const onFormJKJYConfirm = (...args: submitType) => {
    const [value, suc, error] = args;
    console.log(value, suc, error);
    validateCSSJFields();
    suc();
  };

  /**
   * 预览报告
   */
  const previewReport = () => {
    validateCSSJFields();
  };

  /**
   * 医师签名-获取签名
   */
  const signHandler = () => {
    window.parent && window.parent.postMessage({ type: 'getSignImg' }, '*');
  };

  const extraOperations = (
    <Button type="primary" onClick={previewReport}>
      预览报告
    </Button>
  );

  const templateData = [
    '脐周未探及明显淋巴结回声。',
    '脐周可探及数枚低回声结节，大者约 * mm，形态规则，呈椭圆形，包膜光整，回声均匀，边界清，可/未见淋巴门。',
  ];

  const selectTemplateHandler = (index: number) => {
    let text = formCSSJ.getFieldValue('cssj') || '';
    if (text) text += ' ';
    text += templateData[index];
    formCSSJ.setFieldsValue({ cssj: text });
  };

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => selectTemplateHandler(0)}>
        <div
          style={{
            display: 'flex',
            width: '300px',
            alignItems: 'center',
            justifyContent: 'space-between',
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
            脐周未探及明显淋巴结回声。
          </div>
          <Button type="link">填入</Button>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={() => selectTemplateHandler(1)}>
        <div
          style={{
            display: 'flex',
            width: '300px',
            alignItems: 'center',
            justifyContent: 'space-between',
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
            脐周可探及数枚低回声结节。
          </div>
          <Button type="link">填入</Button>
        </div>
      </Menu.Item>
    </Menu>
  );
  const tabs = [
    {
      key: 'cssj',
      name: '超声所见',
      render: (): React.ReactNode => (
        <div>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button>快捷选项</Button>
          </Dropdown>
          <DynamicForm {...cssj} onSubmit={onFormCSSJConfirm} form={formCSSJ} />
        </div>
      ),
    },
    {
      key: 'csts',
      name: '超声提示',
      render: (): React.ReactNode => (
        <DynamicForm {...csts} onSubmit={onFormCSTSConfirm} form={formCSTS} />
      ),
    },
    {
      key: 'jkjy',
      name: '健康建议',
      render: (): React.ReactNode => (
        <DynamicForm {...jkjy} onSubmit={onFormJKJYConfirm} form={formJKJY} />
      ),
    },
    {
      key: 'ysqm',
      name: '医生签名',
      render: (): React.ReactNode => (
        <CompDoctorSign
          onSubmit={previewReport}
        />
      ),
    },
  ];

  /**
   * 渲染tab
   * @param tabs tab配置文件
   * @param isFirstLevel 是否是第一级tab
   * @returns
   */
  const renderTab = (
    tabs: Array<{ name: string; key: string; render?: () => React.ReactNode }>,
  ): React.ReactNode => (
    <Tabs
      onChange={(activeKey) => setFirstLevelActiveKey(activeKey)}
      activeKey={firstLevelActiveKey}
      tabBarExtraContent={extraOperations}
      size="large"
    >
      {tabs.map((tab) => (
        <TabPane tab={tab.name} key={tab.key} forceRender>
          {tab.render && tab.render()}
        </TabPane>
      ))}
    </Tabs>
  );

  return <div className={styles.container}>{renderTab(tabs)}</div>;
};

export default Universal;
