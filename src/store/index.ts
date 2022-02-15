import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import reportReducer from './reducers/reportReducer';
import historyReportReducer from './reducers/historyReportReducer';
import homeReducer from './reducers/homeReducer';
import loginReducer from './reducers/loginReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    report: reportReducer,
    historyReport: historyReportReducer,
    home: homeReducer,
    login: loginReducer,
  },
});
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store;
