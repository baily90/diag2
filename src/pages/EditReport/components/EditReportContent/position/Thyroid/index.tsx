import {
  ReactNode, FunctionComponent, useEffect, useState,
} from 'react';
import {
  Tabs, Form, Button, message,
} from 'antd';
import _ from 'lodash';
import CompDoctorSign from '@/components/CompDoctorSign';
import {
  left,
  right,
  isthmus,
  remark,
  csts,
  jkjy,
} from '../../formConfig/thyroid';
import { submitType } from '@/types/formField';
import styles from '../index.module.less';
import { transformSubmitDataConfig } from '../../formConfig/thyroid/csts';
import DynamicForm, { transformData } from '@/components/DynamicForm';

const { TabPane } = Tabs;

interface ThyroidProps {

}

const Thyroid: FunctionComponent<ThyroidProps> = () => {
  const [formLeft] = Form.useForm();
  const [formRight] = Form.useForm();
  const [formIsthmus] = Form.useForm();
  const [formRemark] = Form.useForm();
  const [formCSTS] = Form.useForm();
  const [formJKJY] = Form.useForm();

  const [firstLevelActiveKey, setFirstLevelActiveKey] = useState('cssj');
  const [secondLevelActiveKey, setSecondLevelActiveKey] = useState('left');

  const [signImg, setSignImg] = useState();

  const normalData = {
    tabs: {
      left: {
        thyroid_size: 0,
        thyroid_echoes: 0,
        echoes_uniformity: 0,
        exist_tuber: 0,
      },
      right: {
        thyroid_size: 0,
        thyroid_echoes: 0,
        echoes_uniformity: 0,
        exist_tuber: 0,
      },
      isthmus: {
        thyroid_size: 0,
        thyroid_echoes: 0,
        echoes_uniformity: 0,
        exist_tuber: 0,
      },
    },
    csts: [0],
    cs_tips: ['54'],
    health_proposal: 0,
  };

  const handler = (e: any) => {
    if (e.origin !== origin) return;
    console.log('mesFromReact', e?.data);
    const { type, data } = e?.data;
    if (type === 'onekeyNormal') {
      formLeft.resetFields();
      formRight.resetFields();
      formIsthmus.resetFields();
      formRemark.resetFields();
      formCSTS.resetFields();
      formJKJY.resetFields();

      formLeft.setFieldsValue(normalData);
      formRight.setFieldsValue(normalData);
      formIsthmus.setFieldsValue(normalData);
      formCSTS.setFieldsValue(normalData);
      formJKJY.setFieldsValue(normalData);
      setFirstLevelActiveKey('ysqm');
    } else if (type === 'getSignImg') {
      setSignImg(data?.url);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

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
          await formIsthmus.validateFields();
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
                  formIsthmus.getFieldsValue(),
                  formRemark.getFieldsValue(),
                  formJKJY.getFieldsValue(),
                  { cs_tip_des, cs_tips },
                );

                window.parent
                  && window.parent.postMessage(
                    { type: 'previewReport', data },
                    '*',
                  );
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
          setSecondLevelActiveKey('isthmus');
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
    {
      key: 'isthmus',
      name: '峡部',
      render: (): ReactNode => (
        <DynamicForm {...isthmus} form={formIsthmus} />
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

  return (
    <div className={styles.container}>
      123
      {renderTab(firstTabs, true)}
    </div>
  );
};

export default Thyroid;
