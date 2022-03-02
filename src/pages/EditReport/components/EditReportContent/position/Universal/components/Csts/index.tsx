import { FormInstance } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { RootState } from '@/store';
import DynamicForm from '@/components/DynamicForm';
import { FieldType, submitType } from '@/types/formField';

interface CstsProps {
  form: FormInstance,
  validateFields: (values: any) => Promise<void>
}

const Csts: FunctionComponent<CstsProps> = ({
  form,
  validateFields,
}) => {
  console.log('Csts');
  const [formConfig, setFormConfig] = useState();
  const {
    reportConf,
  } = useSelector((state: RootState) => state.report);

  useEffect(() => {
    if (reportConf) {
      const csts = reportConf?.csts || [];
      console.log(csts);
      setFormConfig(getFormConfig(csts));
    }
  }, [reportConf]);

  const onFormConfirm = (...args: submitType) => {
    const [value, suc, error] = args;
    validateFields(value);
    suc();
  };

  const getFormConfig = (opts) => {
    const options = [];
    opts.forEach((opt, index) => {
      const { category } = opt; // 类型 1 文本框 2 下拉选项 3 选项文字 4 下拉选项+文字
      let obj = null;
      if (category === 1) {
        obj = {
          label: '',
          value: opt.id,
          suffix: [
            {
              name: ['csts', opt.id, 'id'],
              type: 'text',
              initialValue: opt.id,
            },
            {
              name: ['csts', opt.id, 'category'],
              type: 'text',
              initialValue: opt.category,
            },
            {
              style: { width: 300 },
              name: ['csts', opt.id, 'content', 0],
              type: 'textarea',
              calIsDisabled: (getFieldValue) => !getFieldValue('csts_checkbox')?.includes(opt.id),
              rules: [
                (formInstance: FormInstance) => ({
                  required: formInstance.getFieldValue('csts_checkbox')?.includes(opt.id),
                  message: '请输入其他描述内容',
                }),
              ],
              extraProps: {
                placeholder: '可输入其他描述内容',
              },
            },
          ],
        };
        options.push(obj);
      } else if (category === 2) {
        obj = {
          label: '',
          value: opt.id,
          suffix: [
            {
              name: ['csts', opt.id, 'id'],
              type: 'text',
              initialValue: opt.id,
            },
            {
              name: ['csts', opt.id, 'category'],
              type: 'text',
              initialValue: opt.category,
            },
            {
              style: { display: 'inline-block', width: 150, marginBottom: 0 },
              name: ['csts', opt.id, 'content', 0],
              type: 'select',
              calIsDisabled: (getFieldValue: any) => !getFieldValue('csts_checkbox')?.includes(opt.id),
              rules: [
                (formInstance: FormInstance) => {
                  const isChecked = formInstance.getFieldValue('csts_checkbox')?.includes(opt.id);
                  return { required: isChecked, message: '请选择' };
                },
              ],
              extraProps: {
                options: opt.content.map((item) => ({ label: item, value: item })),
              },
            },
          ],
        };
        options.push(obj);
      } else if (category === 3) {
        obj = {
          label: '',
          value: opt.id,
          suffix: [
            {
              name: ['csts', opt.id, 'id'],
              type: 'text',
              initialValue: opt.id,
            },
            {
              name: ['csts', opt.id, 'category'],
              type: 'text',
              initialValue: opt.category,
            },
            {
              style: { display: 'inline-block', width: 150, marginBottom: 0 },
              name: ['csts', opt.id, 'content', 0],
              type: 'text',
              extraProps: {
                style: {
                  color: '#000',
                },
                bordered: false,
                disabled: true,
              },
              initialValue: opt.content[0],
            },
          ],
        };
        options.push(obj);
      } else if (category === 4) {
        const suffix = [
          {
            name: ['csts', opt.id, 'id'],
            type: 'text',
            initialValue: opt.id,
          },
          {
            name: ['csts', opt.id, 'category'],
            type: 'text',
            initialValue: opt.category,
          },
        ];
        const innerForm = [];
        opt?.compose.forEach((item, index) => {
          const { selectType, isRequired, content } = item;
          // selectType: 1为选项，2为文字
          // isRequired: 1为必填，2为非必填
          if (selectType === 2) {
            const temp = {
              style: { display: 'inline-block', width: 150, marginBottom: 0 },
              name: ['csts', opt.id, 'content', index],
              type: 'text',
              extraProps: {
                style: {
                  color: '#000',
                },
                bordered: false,
                disabled: true,
              },
              initialValue: content[0],
            };
            innerForm.push(temp);
          } else if (selectType === 1) {
            const temp = {
              style: { display: 'inline-block', width: 150, marginBottom: 0 },
              name: ['csts', opt.id, 'content', index],
              type: 'select',
              calIsDisabled: (getFieldValue: any) => !getFieldValue('csts_checkbox')?.includes(opt.id),
              rules: [
                (formInstance: FormInstance) => {
                  const isChecked = formInstance.getFieldValue('csts_checkbox')?.includes(opt.id);
                  return { required: (isChecked && isRequired === 1), message: '请选择' };
                },
              ],
              extraProps: {
                options: content.map((item) => ({ label: item, value: item })),
              },
            };
            innerForm.push(temp);
          }
        });
        const complex = {
          style: { marginBottom: 0 },
          name: 'xxx',
          type: 'complex',
          extraProps: {
            innerForm,
          },
        };
        suffix.push(complex);
        obj = {
          label: '',
          value: opt.id,
          suffix,
        };
        options.push(obj);
      }
    });
    const config = {
      saveText: '下一步',
      fields: [
        {
          name: 'csts_checkbox',
          type: 'checkboxGroup',
          label: '',
          rules: [
            { required: true, message: '请至少勾选一项超声提示' },
          ],
          extraProps: {
            direction: 'vertical',
            options,
          },
        },
      ],
    };

    console.log(config);

    return config;
  };

  return (
    <DynamicForm
      form={form}
      {...formConfig}
      onSubmit={onFormConfirm}
    />
  );
};

export default Csts;
