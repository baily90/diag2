import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import reportReducer from './reducers/reportReducer';
import historyReportReducer from './reducers/historyReportReducer';
import homeReducer from './reducers/homeReducer';
import loginReducer from './reducers/loginReducer';
import patientCaseReducer from './reducers/patientCaseReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    report: reportReducer,
    historyReport: historyReportReducer,
    home: homeReducer,
    login: loginReducer,
    patientCase: patientCaseReducer,
  },
});
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store;
