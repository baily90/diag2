import { useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Modal } from 'antd';

export const useDynamicTableSize = () => {
  const fetchDom = document.querySelector('#DynamicTable');
  return useMemo(() => {
    if (isEmpty(fetchDom)) return { width: 0, height: 0 };
    const cssTypes = fetchDom?.getBoundingClientRect();
    return { width: cssTypes?.width, height: `calc(100vh - ${cssTypes?.top + 110}px)` };
  }, [fetchDom]);
};

export const useConfirm = (content: string, onOkCB: () => void) => {
  Modal.confirm({
    title: '提示',
    content,
    okText: '确认',
    cancelText: '取消',
    onOk: () => onOkCB(),
  });
};
