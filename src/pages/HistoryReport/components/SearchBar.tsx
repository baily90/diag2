import { Button, Form, Select } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList, getHistoryReportList, updateState } from '@/store/reducers/historyReportReducer';
import { defaultSearchParams } from '../config';

interface SearchBarProps {

}

const SearchBar: FunctionComponent<SearchBarProps> = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [productOptions, setProductOptions] = useState([]);
  const { searchParams, productList } = useSelector((state) => state.historyReport);

  useEffect(() => {
    dispatch(getHistoryReportList(searchParams));
    dispatch(getProductList());
  }, []);

  useEffect(() => {
    const { product_id, start_time, end_time } = searchParams;
    form.setFieldsValue({
      product_id, start_time, end_time,
    });
  }, [searchParams]);

  useEffect(() => {
    const temp = productList.map((item) => ({ label: item.name, value: item.id }));
    temp.unshift({ label: '全部', value: '' });
    setProductOptions(temp);
  }, [productList]);

  const onFinish = (values) => {
    const newSearchParams = { ...searchParams, ...values, page: 1 };
    dispatch(updateState({ searchParams: newSearchParams }));
    dispatch(getHistoryReportList(newSearchParams));
  };

  const onReset = () => {
    dispatch(updateState({ searchParams: { ...defaultSearchParams, page: 1 } }));
    form.setFieldsValue(defaultSearchParams);
  };

  return (
    <Form form={form} name="SearchBar" layout="inline" onFinish={onFinish}>
      <Form.Item
        style={{
          width: 220,
        }}
        label="报告产品"
        name="product_id"
        colon={false}
      >
        <Select loading={!productOptions?.length} options={productOptions} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">
          查询
        </Button>
        <Button style={{ marginLeft: 10 }} onClick={onReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchBar;
