import {
  ReactNode, FunctionComponent, useEffect, useState,
} from 'react';
import {
  Tabs, Form, Button, message, FormInstance,
} from 'antd';
import _ from 'lodash';
// import CompDoctorSign from 'components/CompDoctorSign';
import DynamicForm, { transformData } from '@/components/DynamicForm';
import {
  left, right, remark, csts, jkjy,
} from '../../formConfig/carotid';
import { submitType } from '@/types/formField';
import styles from '../index.module.less';
import { transformSubmitDataConfig } from '../../formConfig/carotid/csts';
import CompDoctorSign from '@/components/CompDoctorSign';

const { TabPane } = Tabs;

interface CarotidProps {
  forms: FormInstance[],
  defaultData?: {
    [key: string]: string;
  };
  firstLevelActiveKey: string,
  setFirstLevelActiveKey: (val: string) => void,
  secondLevelActiveKey: string,
  setSecondLevelActiveKey: (val: string) => void,
  validateCSSJFields: () => void
}

const Carotid: FunctionComponent<CarotidProps> = ({
  defaultData,
  forms,
  firstLevelActiveKey,
  setFirstLevelActiveKey,
  secondLevelActiveKey,
  setSecondLevelActiveKey,
  validateCSSJFields,
}) => {
  const [formLeft, formRight, formRemark, formCSTS, formJKJY] = forms;

  useEffect(() => {
    _.merge(normalData, defaultData);
    formLeft.setFieldsValue(defaultData);
    formRight.setFieldsValue(defaultData);
  }, [defaultData]);

  const normalData = {
    tabs: {
      left: {
        not_show: 0,
        intimal_surface: 1,
        intimal_thickness: '',
        intimal_echoes: 1,
        luminal_patch: 1,
        blood_flow: 0,
      },
      right: {
        not_show: 0,
        intimal_surface: 1,
        intimal_thickness: '',
        intimal_echoes: 1,
        luminal_patch: 1,
        blood_flow: 0,
      },
    },
    csts: [0],
    cs_tips: ['63'],
    health_proposal: 0,
  };

  const handler = (e: any) => {
    if (e.origin !== origin) return;
    console.log('mesFromReact', e?.data);
    const { type } = e?.data;
    if (type === 'onekeyNormal') {
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

  const extraOperations = (
    <Button type="primary" onClick={previewReport}>
      预览报告
    </Button>
  );
  // 二级tab配置
  const secondTabs = [
    {
      key: 'left',
      name: '左侧',
      render: (): ReactNode => <DynamicForm {...left} form={formLeft} />,
    },
    {
      key: 'right',
      name: '右侧',
      render: (): ReactNode => (
        <DynamicForm {...right} form={formRight} />
      ),
    },
  ];

  // 一级tab配置
  const firstTabs = [
    {
      key: 'cssj',
      name: '超声所见',
      render: (): ReactNode => renderTab(secondTabs),
    },
    {
      key: 'csts',
      name: '超声提示',
      render: (): ReactNode => (
        <DynamicForm {...csts} onSubmit={onFormCSTSConfirm} form={formCSTS} />
      ),
    },
    {
      key: 'jkjy',
      name: '健康建议',
      render: (): ReactNode => (
        <DynamicForm {...jkjy} onSubmit={onFormJKJYConfirm} form={formJKJY} />
      ),
    },
    {
      key: 'ysqm',
      name: '医生签名',
      render: (): ReactNode => (
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
    tabs: Array<{ name: string; key: string; render?: () => ReactNode }>,
    isFirstLevel?: boolean,
  ): ReactNode => (
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

export default Carotid;
