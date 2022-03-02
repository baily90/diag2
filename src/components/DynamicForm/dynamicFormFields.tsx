import { Form } from 'antd';
import get from 'lodash/get';
import { FieldType } from '@/types/formField';
import {
  NumberField,
  TextAreaField,
  InputField,
  CheckboxField,
  CheckboxGroupField,
  RadioGroupField,
  ComplexFields,
  SelectFields,
  DateRangeField,
} from './fields';

const FieldTypeComponent = {
  number: NumberField,
  textarea: TextAreaField,
  text: InputField,
  checkbox: CheckboxField,
  checkboxGroup: CheckboxGroupField,
  radioGroup: RadioGroupField,
  complex: ComplexFields,
  select: SelectFields,
  dateRange: DateRangeField,
};

const dynamicFormFields = (fields: Array<FieldType>) => fields?.map(
  (
    {
      name,
      type,
      extraProps,
      prefixIcon,
      suffixIcon,
      calIsVisible = () => true,
      calIsDisabled = () => false,
      ...rest
    }: FieldType,
    idx: number,
  ) => {
    const FormItem = Form.Item;
    const formItemProps: { [k: string]: unknown } = {
      name,
      type,
      valuePropName: type === 'checkbox' ? 'checked' : 'value',
      ...rest,
    };

    const FieldComponent = get(FieldTypeComponent, type, InputField);
    return (
      <Form.Item shouldUpdate key={(name || idx).toString()} noStyle>
        {({ getFieldValue }) => (calIsVisible(getFieldValue) ? (
          <>
            {prefixIcon?.(getFieldValue)}
            <FormItem {...formItemProps}>
              <FieldComponent
                disabled={calIsDisabled(getFieldValue)}
                {...extraProps}
              />
            </FormItem>
            {suffixIcon?.(getFieldValue)}
          </>
        ) : null)}
      </Form.Item>
    );
  },
);

export default dynamicFormFields;
