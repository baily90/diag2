import dynamicFormFields from '../dynamicFormFields';
import { FieldType } from '@/types/formField';

export default function ComplexFields({
  innerForm,
}: {
  innerForm: Array<FieldType>;
}) {
  return <>{dynamicFormFields(innerForm)}</>;
}
