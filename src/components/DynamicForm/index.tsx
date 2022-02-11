import { Form, Button, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { FormInstance, FormProps } from 'antd/lib/form/Form';
import get from 'lodash/get';
import set from 'lodash/set';
import omit from 'lodash/omit';
import cloneDeep from 'lodash/cloneDeep';
import { FieldType, submitType, TransformType } from '@/types/formField';
import dynamicFormFields from './dynamicFormFields';

interface Props extends FormProps {
  saveText?: string;
  initialValues?: { [v: string]: unknown };
  onSubmit?: (...args: submitType) => void;
  fields: Array<FieldType>;
  form: FormInstance;
  transformSubmitDataConfig?: Array<TransformType>;
}

export const transformData = (
  values: { [v: string]: unknown },
  transformSubmitDataConfig: any,
) => {
  const forkTransformConfig = cloneDeep(transformSubmitDataConfig);
  while (forkTransformConfig.length > 0) {
    const {
      from,
      isDelete = false,
      to,
      format,
    } = forkTransformConfig.shift() as TransformType;
    const fromValue = get(values, from);
    const toValue = get(values, to);
    set(values, to, format(fromValue, toValue));
    if (isDelete) {
      values = omit(values, from);
    }
  }
  return values;
};

const DynamicForm = ({
  saveText,
  layout = 'horizontal',
  wrapperCol = {},
  labelCol = {},
  initialValues,
  onSubmit = () => {},
  fields: defaultFields,
  form,
  transformSubmitDataConfig = [],
}: Props) => {
  // const [form] = Form.useForm();
  const [fields, setFormFields] = useState<Array<FieldType>>([]);
  const [loading, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setFormFields(defaultFields);
  }, [defaultFields]);

  const computedSubmitValues = useCallback(
    (values) => transformData(values, transformSubmitDataConfig),

    [transformSubmitDataConfig],
  );

  const onFinish = useCallback(
    (values) => {
      setIsSubmitting(true);
      onSubmit(
        computedSubmitValues(values),
        (msg) => {
          const { setFieldsValue, getFieldsValue } = form;
          setIsSubmitting(false);
          setFieldsValue(getFieldsValue()); // reset form touched state
          if (msg) message.success(msg);
        },
        () => {
          setIsSubmitting(false);
        },
      );
    },
    [form, onSubmit, computedSubmitValues],
  );

  const onFinishFailed = useCallback(
    ({ errorFields }) => {
      form.scrollToField(errorFields[0].name);
    },
    [form],
  );

  return (
    <Form
      {...{
        layout,
        form,
        onFinish,
        onFinishFailed,
        initialValues,
        wrapperCol,
        labelCol,
      }}
      name="basic"
      size="small"
    >
      {dynamicFormFields(fields)}
      {saveText && (
        <Form.Item>
          <Button
            size="large"
            loading={loading}
            type="primary"
            htmlType="submit"
          >
            {saveText}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default DynamicForm;
