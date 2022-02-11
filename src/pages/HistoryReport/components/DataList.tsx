import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TablePaginationConfig } from 'antd';
import DynamicTable from '@/components/DynamicTable';
import { getHistoryReportList, updateState } from '@/store/reducers/historyReportReducer';
import { columns } from '../config';

interface DataListProps {

}

const DataList: FunctionComponent<DataListProps> = () => {
  const dispatch = useDispatch();
  const { searchParams, dataSource } = useSelector((state) => state.historyReport);

  const onChange = (pagination: TablePaginationConfig) => {
    const { current } = pagination;
    const params = { ...searchParams, page: current };
    dispatch(updateState({ searchParams: params }));
    dispatch(getHistoryReportList(params));
  };
  return (
    <DynamicTable
      rowKey="id"
      dataSource={dataSource.list}
      columns={columns}
      paginationData={{ total: dataSource.count, current: searchParams.page }}
      onChange={onChange}
    />
  );
};

export default DataList;
