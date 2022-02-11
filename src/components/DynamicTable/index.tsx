import { FunctionComponent } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/Table';
import { useDynamicTableSize } from '@/utils/hooks';

type paginationDataType = {
  total: number,
  current: number,
}

export interface DynamicTableProps extends TableProps<any> {
  paginationData?: paginationDataType,
}

const DynamicTable: FunctionComponent<DynamicTableProps> = ({
  paginationData, ...props
}) => {
  const { width, height } = useDynamicTableSize();
  return (
    <Table
      {...props}
      id="DynamicTable"
      bordered
      size="small"
      scroll={{ scrollToFirstRowOnChange: true, x: width, y: height }}
      style={{ height }}
      pagination={paginationData ? {
        showTotal: () => `共${paginationData?.total}条`,
        current: paginationData?.current,
        total: paginationData?.total,
        showSizeChanger: false,
        size: 'small',
      } : false}
    />
  );
};
export default DynamicTable;
