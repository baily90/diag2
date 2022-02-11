import { createSlice } from '@reduxjs/toolkit';
import { getProductListServive, getHistoryReportListServive } from '@/services/historyReport';
import { AppDispatch } from '..';

interface HistoryReportState {
  searchParams: {
    page: number,
    product_id: string,
    start_time: string,
    end_time: string
  },
  dataSource: {
    count: number,
    list: []
  },
  productList: []
}

const initialState: HistoryReportState = {
  searchParams: {
    page: 1,
    product_id: '',
    start_time: '',
    end_time: '',
  },
  dataSource: {
    count: 0,
    list: [],
  },
  productList: [],
};

export const historyReportSlice = createSlice({
  name: 'historyReport',
  initialState,
  reducers: {
    updateState(state, { payload }): HistoryReportState {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { updateState } = historyReportSlice.actions;

export const getProductList = () => async (dispatch: AppDispatch) => {
  const { data } = await getProductListServive();
  if (data) {
    dispatch(updateState({ productList: data }));
  }
};

export const getHistoryReportList = (params) => async (dispatch: AppDispatch) => {
  const { data } = await getHistoryReportListServive(params);
  if (data) {
    dispatch(updateState({ dataSource: data }));
  }
};

export default historyReportSlice.reducer;
