import { FormInstance } from 'antd';
import { FieldType, TransformType } from '@/types/formField';
import {
  breastNormal,
  breastNodule,
  breastLesion,
  breastExpands,
  breastLevel,
} from '@/constants/selectOptions';

const innerForm = (
  value: number,
  suffixIconValue: string,
  options: any,
): Array<FieldType> => [
  {
    style: { display: 'inline-block', width: 150, marginBottom: 0 },
    name: ['cs_tips', value],
    type: 'select',
    calIsDisabled: (getFieldValue) => !getFieldValue('csts')?.includes(value),
    rules: [
      (form: FormInstance) => {
        const isChecked = form.getFieldValue('csts')?.includes(value);
        return { required: isChecked, message: '请选择' };
      },
    ],
    suffixIcon: () => suffixIconValue,
    extraProps: {
      options,
    },
  },
];

const innerFormTextArea = (value: string): Array<FieldType> => [
  {
    style: { width: 300 },
    name: 'cs_tip_des',
    type: 'textarea',
    calIsDisabled: (getFieldValue) => !getFieldValue('csts')?.includes(value),
    rules: [
      (form: FormInstance) => ({
        required: form.getFieldValue('csts')?.includes(value),
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
    name: 'csts',
    type: 'checkboxGroup',
    label: '',
    rules: [
      { required: true, message: '请至少勾选一项超声提示' },
      ({ getFieldsValue, setFieldsValue }: FormInstance) => ({
        validator(_: unknown, value: Array<number> | undefined) {
          const { cs_tips, csts } = getFieldsValue();
          if (!value?.includes(1)) {
            setFieldsValue?.({
              nodule_first: undefined,
              nodule_second: undefined,
            });
          }
          const params = cs_tips.map((item: string, idx: number) => (value?.includes(idx) ? item : undefined));
          setFieldsValue?.({ cs_tips: params });
          if (!csts?.includes('other')) {
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
          label: '',
          value: 0,
          suffix: innerForm(0, '乳腺超声检查未见明显异常', breastNormal),
        },
        {
          label: '',
          value: 1,
          suffix: [
            {
              style: { display: 'inline-block', width: 150, marginBottom: 0 },
              name: ['nodule_first'],
              type: 'select',
              calIsDisabled: (getFieldValue: any) => !getFieldValue('csts')?.includes(1),
              rules: [
                (form: FormInstance) => {
                  const isChecked = form.getFieldValue('csts')?.includes(1);
                  return { required: isChecked, message: '请选择' };
                },
              ],
              suffixIcon: () => '乳腺结节',
              extraProps: {
                options: breastNodule,
              },
            },
            {
              style: { display: 'inline-block', width: 150, marginBottom: 0 },
              name: ['nodule_second'],
              type: 'select',
              calIsDisabled: (getFieldValue: any) => !getFieldValue('csts')?.includes(1),
              rules: [
                (form: FormInstance) => {
                  const isChecked = form.getFieldValue('csts')?.includes(1);
                  return { required: isChecked, message: '请选择分类等级' };
                },
              ],
              suffixIcon: () => '',
              extraProps: {
                options: breastLevel,
              },
            },
          ],
        },
        {
          label: '',
          value: 2,
          suffix: innerForm(2, '乳腺增生性病变', breastLesion),
        },
        {
          label: '',
          value: 3,
          suffix: innerForm(3, '乳腺导管扩张', breastExpands),
        },
        {
          label: '',
          value: 'other',
          suffix: innerFormTextArea('other'),
        },
      ],
    },
  },
];

/**
 * 特殊处理映射关系，前端原定前面id,临时接口需要后面id
 */
const obj: { [key: string]: string } = {
  2441: '51',
  2442: '52',
  2443: '53',
  2541: '54',
  2542: '55',
  2543: '56',
  2641: '57',
  2642: '58',
  2643: '59',
};

export const transformSubmitDataConfig: Array<TransformType> = [
  {
    from: 'nodule_first',
    to: 'cs_tips[1]',
    format: (fromValue: any, toValue: any) => fromValue,
    isDelete: false,
  },
  {
    from: 'nodule_second',
    to: 'cs_tips[1]',
    format: (fromValue: any, toValue: any) => {
      let id;
      if (fromValue && toValue) {
        const key = toValue + fromValue;
        id = obj[key];
      }
      return id;
    },
    isDelete: false,
  },
];

const config = {
  saveText: '下一步',
  fields: fieldsForm,
};

export default config;
