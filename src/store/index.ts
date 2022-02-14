import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import reportReducer from './reducers/reportReducer';
import historyReportReducer from './reducers/historyReportReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    report: reportReducer,
    historyReport: historyReportReducer,
  },
});
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store;
