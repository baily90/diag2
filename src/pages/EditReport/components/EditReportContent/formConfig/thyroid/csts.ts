import { FormInstance } from 'antd';
import { FieldType, TransformType } from '@/types/formField';
import {
  soundThyNormal,
  soundThyAndNodule,
  soundThyNodule,
  soundThyChange,
  soundThyBig,
  soundThyKit,
  soundThyLevel,
} from '@/constants/selectOptions';

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
          if (!value?.includes(2)) {
            setFieldsValue?.({
              andnodule_first: undefined,
              andnodule_second: undefined,
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
          suffix: [
            {
              style: { display: 'inline-block', width: 150, marginBottom: 0 },
              name: ['cs_tips', 0],
              type: 'select',
              calIsDisabled: (getFieldValue: any) => !getFieldValue('csts')?.includes(0),
              rules: [
                (form: FormInstance) => {
                  const isChecked = form.getFieldValue('csts')?.includes(0);
                  return { required: isChecked, message: '请选择' };
                },
              ],
              suffixIcon: () => '甲状腺超声检查未见明显异常',
              extraProps: {
                options: soundThyNormal,
              },
            },
          ],
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
              suffixIcon: () => '甲状腺结节',
              extraProps: {
                options: soundThyNodule,
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
                options: soundThyLevel,
              },
            },
          ],
        },
        {
          label: '',
          value: 2,
          suffix: [
            {
              style: { display: 'inline-block', width: 150, marginBottom: 0 },
              name: ['andnodule_first'],
              type: 'select',
              calIsDisabled: (getFieldValue: any) => !getFieldValue('csts')?.includes(2),
              rules: [
                (form: FormInstance) => {
                  const isChecked = form.getFieldValue('csts')?.includes(2);
                  return { required: isChecked, message: '请选择' };
                },
              ],
              suffixIcon: () => '甲状腺结节伴钙化',
              extraProps: {
                options: soundThyAndNodule,
              },
            },
            {
              style: { display: 'inline-block', width: 150, marginBottom: 0 },
              name: ['andnodule_second'],
              type: 'select',
              calIsDisabled: (getFieldValue: any) => !getFieldValue('csts')?.includes(2),
              rules: [
                (form: FormInstance) => {
                  const isChecked = form.getFieldValue('csts')?.includes(2);
                  return { required: isChecked, message: '请选择分类等级' };
                },
              ],
              suffixIcon: () => '',
              extraProps: {
                options: soundThyLevel,
              },
            },
          ],
        },
        {
          label: '',
          value: 3,
          suffix: [
            {
              style: { display: 'inline-block', width: 150, marginBottom: 0 },
              name: ['cs_tips', 3],
              type: 'select',
              calIsDisabled: (getFieldValue: any) => !getFieldValue('csts')?.includes(3),
              rules: [
                (form: FormInstance) => {
                  const isChecked = form.getFieldValue('csts')?.includes(3);
                  return { required: isChecked, message: '请选择' };
                },
              ],
              suffixIcon: () => '甲状腺弥漫性病变，结合甲状腺功能检查',
              extraProps: {
                options: soundThyChange,
              },
            },
          ],
        },
        {
          label: '',
          value: 4,
          suffix: [
            {
              style: { display: 'inline-block', width: 150, marginBottom: 0 },
              name: ['cs_tips', 4],
              type: 'select',
              calIsDisabled: (getFieldValue: any) => !getFieldValue('csts')?.includes(4),
              rules: [
                (form: FormInstance) => {
                  const isChecked = form.getFieldValue('csts')?.includes(4);
                  return { required: isChecked, message: '请选择' };
                },
              ],
              suffixIcon: () => '甲状腺肿大',
              extraProps: {
                options: soundThyBig,
              },
            },
          ],
        },
        {
          label: '',
          value: 5,
          suffix: [
            {
              style: { display: 'inline-block', width: 150, marginBottom: 0 },
              name: ['cs_tips', 5],
              type: 'select',
              calIsDisabled: (getFieldValue: any) => !getFieldValue('csts')?.includes(5),
              rules: [
                (form: FormInstance) => {
                  const isChecked = form.getFieldValue('csts')?.includes(5);
                  return { required: isChecked, message: '请选择' };
                },
              ],
              suffixIcon: () => '甲状腺钙化灶',
              extraProps: {
                options: soundThyKit,
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
  61111: '120',
  61112: '121',
  61113: '122',
  62111: '123',
  62112: '124',
  62113: '125',
  63111: '126',
  63112: '127',
  63113: '128',
  64111: '129',
  64112: '130',
  64113: '131',
  101111: '140',
  101112: '141',
  101113: '142',
  102111: '143',
  102112: '144',
  102113: '145',
  103111: '146',
  103112: '147',
  103113: '148',
  104111: '149',
  104112: '150',
  104113: '151',
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
  {
    from: 'andnodule_first',
    to: 'cs_tips[2]',
    format: (fromValue: any, toValue: any) => fromValue,
    isDelete: false,
  },
  {
    from: 'andnodule_second',
    to: 'cs_tips[2]',
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
  // transformSubmitDataConfig
};

export default config;
