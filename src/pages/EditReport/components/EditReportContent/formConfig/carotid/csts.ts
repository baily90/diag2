import { FormInstance } from 'antd';
import {
  soundCarNormal,
  soundCarFilmGred,
  soundCarPlaQue,
  soundCarStenosisPart,
  soundCarStenosis,
} from '@/constants/selectOptions';
import { FieldType, TransformType } from '@/types/formField';

const innerForm = (
  value: number,
  suffixIconValue: string,
  options: any,
): Array<FieldType> => [
  {
    style: { display: 'inline-block', width: 120, marginBottom: 0 },
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
          if (!value?.includes(3)) {
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
          suffix: innerForm(0, '颈动脉超声检查未见明显异常', soundCarNormal),
        },
        {
          label: '',
          value: 1,
          suffix: innerForm(1, '颈动脉内中膜增厚', soundCarFilmGred),
        },
        {
          label: '',
          value: 2,
          suffix: innerForm(2, '颈动脉可见斑块', soundCarPlaQue),
        },
        {
          label: '',
          value: 3,
          suffix: [
            {
              style: { display: 'inline-block', width: 100, marginBottom: 0 },
              name: ['nodule_first'],
              type: 'select',
              calIsDisabled: (getFieldValue: any) => !getFieldValue('csts')?.includes(3),
              rules: [
                (form: FormInstance) => {
                  const isChecked = form.getFieldValue('csts')?.includes(3);
                  return { required: isChecked, message: '请选择' };
                },
              ],
              suffixIcon: () => '颈动脉斑块形成伴局部管腔狭窄，狭窄率约',
              extraProps: {
                options: soundCarStenosisPart,
              },
            },
            {
              style: { display: 'inline-block', width: 120, marginBottom: 0 },
              name: ['nodule_second'],
              type: 'select',
              calIsDisabled: (getFieldValue: any) => !getFieldValue('csts')?.includes(3),
              rules: [
                (form: FormInstance) => {
                  const isChecked = form.getFieldValue('csts')?.includes(3);
                  return { required: isChecked, message: '请选择' };
                },
              ],
              suffixIcon: () => '',
              extraProps: {
                options: soundCarStenosis,
              },
            },
          ],
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
  201111: '121',
  202111: '122',
  203111: '123',
  204111: '124',
  205111: '125',
  201112: '126',
  202112: '127',
  203112: '128',
  204112: '129',
  205112: '130',
  201113: '131',
  202113: '132',
  203113: '133',
  204113: '134',
  205113: '135',
};

export const transformSubmitDataConfig: Array<TransformType> = [
  {
    from: 'nodule_first',
    to: 'cs_tips[3]',
    format: (fromValue: any, toValue: any) => fromValue,
    isDelete: false,
  },
  {
    from: 'nodule_second',
    to: 'cs_tips[3]',
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
