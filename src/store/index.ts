import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './reducers/counterSlice';
import userReducer from './reducers/userReducer';
import historyReportReducer from './reducers/historyReportReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    historyReport: historyReportReducer,
    counter: counterSlice,
  },
});
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store;
