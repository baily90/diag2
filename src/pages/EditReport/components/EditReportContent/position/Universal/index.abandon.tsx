import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Tabs, Form, Button, message,
} from 'antd';
import _ from 'lodash';
import CompDoctorSign from '@/components/CompDoctorSign';
import DynamicForm from '@/components/DynamicForm';
import { cssj, csts, jkjy } from '../../formConfig/universal';
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
            _.merge(
              data,
              formCSSJ.getFieldsValue(),
              formCSTS.getFieldsValue(),
              formJKJY.getFieldsValue(),
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

  const extraOperations = (
    <Button type="primary" onClick={previewReport}>
      预览报告
    </Button>
  );
  const tabs = [
    {
      key: 'cssj',
      name: '超声所见',
      render: (): React.ReactNode => (
        <DynamicForm {...cssj} onSubmit={onFormCSSJConfirm} form={formCSSJ} />
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
