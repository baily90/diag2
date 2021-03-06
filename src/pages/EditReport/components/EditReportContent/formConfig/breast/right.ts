import {
  IsShow,
  glandThickness,
  glandEcho,
  echoUniformity,
  breastDuct,
  isNodule,
  noduleNum,
  noduleCho,
  noduleForm,
  noduleBorder,
  noduleCalcification,
  backEcho,
} from '@/constants/breastOptions';
import { FieldType } from '@/types/formField';

const InnerForm: Array<FieldType> = [
  {
    style: {
      display: 'inline-block',
    },
    name: ['tabs', 'right', 'tuber_size_x'],
    type: 'number',
    rules: [{ required: true, message: '请输入长值' }],
    prefixIcon: (getFieldValue) => {
      const tuberNum = getFieldValue(['tabs', 'right', 'tuber_num']);
      return tuberNum === 1 ? '约长' : '大者约长';
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
    name: ['tabs', 'right', 'tuber_size_y'],
    type: 'number',
    rules: [{ required: true, message: '请输入宽值' }],
    prefixIcon: () => ' * 宽',
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
    name: ['tabs', 'right', 'tuber_num'],
    type: 'radioGroup',
    label: '结节数目',
    rules: [{ required: true, message: '请输入结节数目' }],
    extraProps: {
      options: noduleNum,
    },
  },
  {
    style: { marginBottom: 0 },
    name: ['tabs', 'right', 'tuber_size_x'],
    type: 'complex',
    label: '结节大小',
    rules: [{ required: true, message: '请输入结节大小' }],
    extraProps: {
      innerForm: InnerForm,
    },
  },
  {
    name: ['tabs', 'right', 'tuber_echo'],
    type: 'radioGroup',
    label: '结节回声',
    rules: [{ required: true, message: '请输入结节回声' }],
    extraProps: {
      options: noduleCho,
      className: 'option-wrap',
    },
  },
  {
    name: ['tabs', 'right', 'tuber_shape'],
    type: 'radioGroup',
    label: '结节形态',
    rules: [{ required: true, message: '请输入结节形态' }],
    extraProps: {
      options: noduleForm,
    },
  },
  {
    name: ['tabs', 'right', 'tuber_edge'],
    type: 'radioGroup',
    label: '结节边界',
    rules: [{ required: true, message: '请输入结节边界' }],
    extraProps: {
      options: noduleBorder,
    },
  },
  {
    name: ['tabs', 'right', 'tuber_calcification'],
    type: 'radioGroup',
    label: '结节钙化',
    rules: [{ required: true, message: '请输入结节钙化' }],
    extraProps: {
      options: noduleCalcification,
      className: 'option-wrap',
    },
  },
  {
    name: ['tabs', 'right', 'back_echo'],
    type: 'radioGroup',
    label: '后方回声',
    rules: [{ required: true, message: '请输入后方回声' }],
    extraProps: {
      options: backEcho,
    },
  },
];
const GroupFormOne: Array<FieldType> = [
  {
    name: ['tabs', 'right', 'gland_thickness'],
    type: 'radioGroup',
    label: '腺体厚度',
    rules: [{ required: true, message: '请输入腺体厚度' }],
    extraProps: {
      options: glandThickness,
    },
  },
  {
    name: ['tabs', 'right', 'gland_echo'],
    type: 'radioGroup',
    label: '腺体回声',
    rules: [{ required: true, message: '请输入腺体回声' }],
    extraProps: {
      options: glandEcho,
    },
  },
  {
    name: ['tabs', 'right', 'echo_uniformity'],
    type: 'radioGroup',
    label: '回声均匀性',
    rules: [{ required: true, message: '请输入回声均匀性' }],
    extraProps: {
      options: echoUniformity,
    },
  },
  {
    name: ['tabs', 'right', 'breast_duct'],
    type: 'radioGroup',
    label: '乳腺导管',
    rules: [{ required: true, message: '请输入乳腺导管' }],
    extraProps: {
      options: breastDuct,
    },
  },
  {
    name: ['tabs', 'right', 'exist_tuber'],
    type: 'radioGroup',
    label: '有无结节',
    rules: [{ required: true, message: '请输入有无结节' }],
    extraProps: {
      options: isNodule,
    },
  },
  {
    style: {
      marginBottom: 0,
    },
    name: ['tabs', 'right', 'tuber_num'],
    type: 'complex',
    calIsVisible: (getFieldsValue) => getFieldsValue(['tabs', 'right', 'exist_tuber']) !== 2
      && getFieldsValue(['tabs', 'right', 'exist_tuber']) !== 3,
    extraProps: {
      innerForm: GroupFormTwo,
    },
  },
];

const fieldsForm: Array<FieldType> = [
  {
    name: ['tabs', 'right', 'not_show'],
    type: 'radioGroup',
    initialValue: 2,
    extraProps: {
      options: IsShow,
    },
  },
  {
    style: {
      marginBottom: 0,
    },
    name: ['tabs', 'right', 'gland_thickness'],
    type: 'complex',
    calIsVisible: (getFieldsValue) => getFieldsValue(['tabs', 'right', 'not_show']) !== 1,
    extraProps: {
      innerForm: GroupFormOne,
    },
  },
];

const config = {
  fields: fieldsForm,
};

export default config;
