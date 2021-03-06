import { FieldType } from "libs/types/formField";

const fieldsForm: Array<FieldType> = [
  {
    style: {
      display: "block",
    },
    name: "remark",
    type: "textarea",
    label: "左右侧及峡部其他备注",
    extraProps: {
      placeholder: "可输入其他描述内容",
    },
  },
];

const config = {
  saveText: "下一步",
  fields: fieldsForm,
};

export default config;
