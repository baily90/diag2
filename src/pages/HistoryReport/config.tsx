import { ColumnsType } from 'antd/lib/Table';
import { FieldType } from '@/types/formField';
import Operate from './components/Operate';

// 操作按钮
export const actions = [
  {
    code: 'detail',
    name: '查看详情',
    type: 'link',
  },
  {
    code: 'cancle',
    name: '撤回',
    type: 'link',
  },
];

// 列表表头配置
export const columns: ColumnsType<any> = [
  {
    title: '报告ID',
    dataIndex: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: '报告产品',
    dataIndex: 'product_name',
    key: 'product_name',
    width: 150,
  },
  {
    title: '患者名字',
    dataIndex: 'patient_name',
    key: 'patient_name',
    width: 150,
  },
  {
    title: '患者年龄',
    dataIndex: 'patient_age',
    key: 'patient_age',
    width: 100,
  },
  {
    title: '报告发送时间',
    dataIndex: 'create_time',
    key: 'create_time',
    width: 220,
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 200,
    render: (text, record) => <Operate record={record} actions={actions}>action</Operate>,
  },
];

// 搜索条件默认值
export const defaultSearchParams = {
  page: 1,
  product_id: '',
  start_time: '',
  end_time: '',
};
