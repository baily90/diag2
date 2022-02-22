import { FieldType } from '@/types/formField';
import { mesareicHealthInfo } from '@/constants/healthInfo';

const innerForm = (value: number): Array<FieldType> => [
  {
    style: { width: '400px' },
    name: 'health_proposal_des',
    type: 'textarea',
    label: '',
    colon: false,
    calIsVisible: (getFieldValue) => getFieldValue('health_proposal') === value,
    extraProps: {
      placeholder: '可输入其他健康建议',
      maxLength: 200,
      allowClear: true,
    },
  },
];

const getOptions = () => mesareicHealthInfo.map((item) => ({
  label: item.label,
  value: item.value,
  tips: item.desc,
  suffix: innerForm(item.value),
}));

const fieldsForm: Array<FieldType> = [
  {
    name: 'health_proposal',
    type: 'radioGroup',
    label: '',
    rules: [{ required: true, message: '请选择健康等级' }],
    extraProps: {
      direction: 'vertical',
      options: getOptions(),
    },
  },
];

const config = {
  saveText: '下一步',
  fields: fieldsForm,
};

export default config;
