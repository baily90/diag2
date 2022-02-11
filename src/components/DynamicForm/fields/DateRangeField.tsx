import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export default function DateRangeField({ ...extraProps }) {
  return <RangePicker {...extraProps} />;
}
