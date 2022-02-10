import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './reducers/counterSlice';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterSlice,
  },
});
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store;
