import { FieldType } from '@/types/formField';

const fieldsForm: Array<FieldType> = [
  {
    name: 'csts',
    type: 'textarea',
    label: '',
    colon: false,
    rules: [
      { required: true, message: '请输入超声提示内容' },
      { max: 200, message: '限200字' },
    ],
    extraProps: {
      placeholder: '请输入超声提示内容(限200字)',
      maxLength: 200,
      showCount: true,
      autoSize: {
        minRows: 7,
      },
    },
  },
];

const config = {
  saveText: '下一步',
  fields: fieldsForm,
};

export default config;
