import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  count: number,
  title: string
}

const initialState: CounterState = {
  count: 1,
  title: 'redux toolkit pre',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state, { payload }) {
      state.count += payload.step;
    },
    decrement(state) {
      state.count -= 1;
    },
  },
});

// 导出actions
export const { increment, decrement } = counterSlice.actions;

// 内置了thunk插件，可以直接处理异步请求
export const asyncIncrement = (payload) => (dispatch) => {
  setTimeout(() => {
    dispatch(increment(payload));
  }, 2000);
};

// 导出reducer，在创建store时使用到
export default counterSlice.reducer;
