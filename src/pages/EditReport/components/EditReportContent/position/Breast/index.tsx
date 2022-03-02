import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Tabs, Form, Button, message,
} from 'antd';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import DynamicForm, { transformData } from '@/components/DynamicForm';
import {
  left, right, remark, csts, jkjy,
} from '../../formConfig/breast';
import CompDoctorSign from '@/components/CompDoctorSign';
import { submitType } from '@/types/formField';
import styles from '../index.module.less';
import { transformSubmitDataConfig } from '../../formConfig/breast/csts';
import { RootState } from '@/store';

const { TabPane } = Tabs;

interface BreastProps {
  normalData: object | null,
  getReportData: (val: object) => void
}

const Breast: FunctionComponent<BreastProps> = ({
  normalData,
  getReportData,
}) => {
  const [formLeft] = Form.useForm();
  const [formRight] = Form.useForm();
  const [formRemark] = Form.useForm();
  const [formCSTS] = Form.useForm();
  const [formJKJY] = Form.useForm();

  const [firstLevelActiveKey, setFirstLevelActiveKey] = useState('cssj');
  const [secondLevelActiveKey, setSecondLevelActiveKey] = useState('left');

  const { signImg } = useSelector((state: RootState) => state.report);

  useEffect(() => {
    if (normalData) {
      formLeft.resetFields();
      formRight.resetFields();
      formRemark.resetFields();
      formCSTS.resetFields();
      formJKJY.resetFields();

      formLeft.setFieldsValue(normalData);
      formRight.setFieldsValue(normalData);
      formCSTS.setFieldsValue(normalData);
      formJKJY.setFieldsValue(normalData);
      setFirstLevelActiveKey('ysqm');
    }
  }, [normalData]);

  /**
   * 超声所见校验器
   * 所有校验通过通知父窗口预览报告
   */
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

              getReportData(data);
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

  const onFormRemarkConfirm = async (...args: submitType) => {
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

  // 一级tab配置
  const firstTabs = [
    {
      key: 'cssj',
      name: '超声所见',
      render: (): React.ReactNode => renderTab(secondTabs),
    },
    {
      key: 'csts',
      name: '超声提示',
      render: (): React.ReactNode => (
        // <CompCsts form={formCSTS} type="1" />
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

  // 二级tab配置
  const secondTabs = [
    {
      key: 'left',
      name: '左侧',
      render: (): React.ReactNode => <DynamicForm {...left} form={formLeft} />,
    },
    {
      key: 'right',
      name: '右侧',
      render: (): React.ReactNode => (
        <DynamicForm {...right} form={formRight} />
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
    isFirstLevel?: boolean,
  ): React.ReactNode => (
    <>
      <Tabs
        onChange={
          isFirstLevel
            ? (activeKey) => setFirstLevelActiveKey(activeKey)
            : (activeKey) => setSecondLevelActiveKey(activeKey)
        }
        activeKey={isFirstLevel ? firstLevelActiveKey : secondLevelActiveKey}
        tabBarExtraContent={isFirstLevel && extraOperations}
        size="large"
      >
        {tabs.map((tab) => (
          <TabPane tab={tab.name} key={tab.key} forceRender>
            {tab.render && tab.render()}
          </TabPane>
        ))}
      </Tabs>
      {/* 超声所见下面的其他备注textarea 三个tab共用，所以得单独抽出来 */}
      <div
        style={{
          display:
            isFirstLevel && firstLevelActiveKey === 'cssj' ? 'block' : 'none',
        }}
      >
        <DynamicForm
          {...remark}
          onSubmit={onFormRemarkConfirm}
          form={formRemark}
        />
      </div>
    </>
  );

  return <div className={styles.container}>{renderTab(firstTabs, true)}</div>;
};

export default Breast;
