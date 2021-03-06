import { FieldType } from '@/types/formField';
import {
  thyroidSize,
  thyroidEcho,
  echoesUniformity,
  existTuber,
  tuberNum,
  tuberEchoes,
  tuberShape,
  tuberEdge,
  tuberCalcification,
} from '@/constants/thyroidOptions';

const InnerForm: Array<FieldType> = [
  {
    style: {
      display: 'inline-block',
    },
    name: ['tabs', 'isthmus', 'tuber_size_x'],
    type: 'number',
    rules: [{ required: true, message: '请输入横值' }],
    prefixIcon: (getFieldValue) => {
      const tuberNum = getFieldValue(['tabs', 'isthmus', 'tuber_num']);
      return tuberNum === 0 ? '约横' : '大者约横';
    },
    suffixIcon: () => 'mm',
    extraProps: {
      min: 0.1,
      precision: 1,
      step: 0.1,
      max: 10000,
    },
  },
  {
    style: {
      display: 'inline-block',
    },
    name: ['tabs', 'isthmus', 'tuber_size_y'],
    type: 'number',
    rules: [{ required: true, message: '请输入纵值' }],
    prefixIcon: () => ' * 纵',
    suffixIcon: () => 'mm',
    extraProps: {
      min: 0.1,
      precision: 1,
      step: 0.1,
      max: 10000,
    },
  },
];
const GroupFormTwo: Array<FieldType> = [
  {
    name: ['tabs', 'isthmus', 'tuber_num'],
    type: 'radioGroup',
    label: '结节数目',
    rules: [{ required: true, message: '请输入结节数目' }],
    extraProps: {
      options: tuberNum,
    },
  },
  {
    style: { marginBottom: 0 },
    name: ['tabs', 'isthmus', 'tuber_size_x'],
    type: 'complex',
    label: '结节大小',
    rules: [{ required: true, message: '请输入结节大小' }],
    extraProps: {
      innerForm: InnerForm,
    },
  },
  {
    name: ['tabs', 'isthmus', 'tuber_echoes'],
    type: 'radioGroup',
    label: '结节回声',
    rules: [{ required: true, message: '请输入结节回声' }],
    extraProps: {
      options: tuberEchoes,
      className: 'option-wrap',
    },
  },
  {
    name: ['tabs', 'isthmus', 'tuber_shape'],
    type: 'radioGroup',
    label: '结节形态',
    rules: [{ required: true, message: '请输入结节形态' }],
    extraProps: {
      options: tuberShape,
    },
  },
  {
    name: ['tabs', 'isthmus', 'tuber_edge'],
    type: 'radioGroup',
    label: '结节边界',
    rules: [{ required: true, message: '请输入结节边界' }],
    extraProps: {
      options: tuberEdge,
    },
  },
  {
    name: ['tabs', 'isthmus', 'tuber_calcification'],
    type: 'radioGroup',
    label: '结节钙化',
    rules: [{ required: true, message: '请输入结节钙化' }],
    extraProps: {
      options: tuberCalcification,
    },
  },
];
const GroupFormOne: Array<FieldType> = [
  {
    name: ['tabs', 'isthmus', 'thyroid_echoes'],
    type: 'radioGroup',
    label: '甲状腺回声',
    rules: [{ required: true, message: '请输入甲状腺回声' }],
    calIsVisible: (getFieldsValue) => getFieldsValue(['tabs', 'isthmus', 'thyroid_size']) !== 3,
    extraProps: {
      options: thyroidEcho,
    },
  },
  {
    name: ['tabs', 'isthmus', 'echoes_uniformity'],
    type: 'radioGroup',
    label: '回声均匀性',
    rules: [{ required: true, message: '请输入回声均匀性' }],
    calIsVisible: (getFieldsValue) => getFieldsValue(['tabs', 'isthmus', 'thyroid_size']) !== 3,
    extraProps: {
      options: echoesUniformity,
    },
  },
  {
    name: ['tabs', 'isthmus', 'exist_tuber'],
    type: 'radioGroup',
    label: '有无结节',
    rules: [{ required: true, message: '请输入有无结节' }],
    extraProps: {
      options: existTuber,
    },
  },
  {
    style: {
      marginBottom: 0,
    },
    name: ['tabs', 'isthmus', 'tuber_num'],
    type: 'complex',
    calIsVisible: (getFieldsValue) => getFieldsValue(['tabs', 'isthmus', 'exist_tuber']) !== 0,
    extraProps: {
      innerForm: GroupFormTwo,
    },
  },
];

const fieldsForm: Array<FieldType> = [
  {
    name: ['tabs', 'isthmus', 'thyroid_size'],
    type: 'radioGroup',
    label: '甲状腺大小',
    rules: [{ required: true, message: '请输入甲状腺大小' }],
    extraProps: {
      options: thyroidSize,
      className: 'option-wrap',
    },
  },
  {
    style: {
      marginBottom: 0,
    },
    name: ['tabs', 'isthmus', 'thyroid_echoes'],
    type: 'complex',
    calIsVisible: (getFieldsValue) => getFieldsValue(['tabs', 'isthmus', 'thyroid_size']) !== 4,
    extraProps: {
      innerForm: GroupFormOne,
    },
  },
];

const config = {
  fields: fieldsForm,
};

export default config;
