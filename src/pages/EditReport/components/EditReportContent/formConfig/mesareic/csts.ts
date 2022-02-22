import { FormInstance } from 'antd';
import { FieldType } from '@/types/formField';

const innerFormTextArea = (value: string): Array<FieldType> => [
  {
    style: { width: 300 },
    name: 'cs_tip_des',
    type: 'textarea',
    calIsDisabled: (getFieldValue) => !getFieldValue('cs_tips')?.includes(value),
    rules: [
      (form: FormInstance) => ({
        required: form.getFieldValue('cs_tips')?.includes(value),
        message: '请输入其他描述内容',
      }),
    ],
    extraProps: {
      placeholder: '可输入其他描述内容',
    },
  },
];

const fieldsForm: Array<FieldType> = [
  {
    name: 'cs_tips',
    type: 'checkboxGroup',
    label: '',
    rules: [
      { required: true, message: '请至少勾选一项超声提示' },
      ({ getFieldsValue, setFieldsValue }: FormInstance) => ({
        validator() {
          const { cs_tips } = getFieldsValue();
          if (!cs_tips?.includes('other')) {
            setFieldsValue?.({ cs_tip_des: undefined });
          }
          return Promise.resolve();
        },
      }),
    ],
    extraProps: {
      direction: 'vertical',
      options: [
        {
          label: '肠系膜未见明显淋巴结回声',
          value: 1,
        },
        {
          label: '肠系膜淋巴结可见',
          value: 2,
        },
        {
          label: '肠系膜淋巴结肿大',
          value: 3,
        },
        // {
        //   label: "恶性肠系膜淋巴结",
        //   value: 4,
        // },
        {
          label: '',
          value: 'other',
          suffix: innerFormTextArea('other'),
        },
      ],
    },
  },
];

const config = {
  saveText: '下一步',
  fields: fieldsForm,
};

export default config;
