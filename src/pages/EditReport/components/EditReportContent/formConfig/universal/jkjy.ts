import { commonSuggestList } from '@/constants/healthInfo';
import { FieldType } from '@/types/formField';

const innerForm = (value: number): Array<FieldType> => [
  {
    style: { width: '400px' },
    name: 'health_proposal_des',
    type: 'textarea',
    label: '',
    colon: false,
    rules: [
      { required: true, message: '请输入健康建议' },
      { max: 200, message: '限200字' },
    ],
    calIsVisible: (getFieldValue) => getFieldValue('health_proposal') === value,
    extraProps: {
      placeholder: '可输入其他健康建议（必填且限200字）',
      maxLength: 200,
      allowClear: true,
      autoSize: {
        minRows: 7,
      },
    },
  },
];

const getOptions = () => commonSuggestList.map((item) => ({
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
