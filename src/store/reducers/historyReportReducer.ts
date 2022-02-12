import { createSlice } from '@reduxjs/toolkit';
import { getProductListServive, getHistoryReportListServive, withdrawReportService } from '@/services/historyReport';
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
  productList: [],
  loading: boolean
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
  loading: true,
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
  try {
    const { data } = await getProductListServive();
    if (data) {
      dispatch(updateState({ productList: data }));
    }
  } catch (error) {
    console.log('getProductList异常');
  }
};

export const getHistoryReportList = (params) => async (dispatch: AppDispatch) => {
  try {
    dispatch(updateState({ loading: true }));
    const { data } = await getHistoryReportListServive(params);
    if (data) {
      dispatch(updateState({ dataSource: data }));
    }
    dispatch(updateState({ loading: false }));
  } catch (error) {
    console.log('getHistoryReportList异常');
    dispatch(updateState({ loading: false }));
  }
};

export const withdrawReport = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const res = await withdrawReportService(id);
    return res;
  } catch (error) {
    console.log('withdrawReport异常');
  }
};

export default historyReportSlice.reducer;
