import { createSlice } from '@reduxjs/toolkit';
import {
  getCaptchaService, loginService, resetPasswordService, sendSmsService,
} from '@/services/login';
import { AppDispatch } from '..';

interface LoginState {
  base64: string,
  code: string,
  sign: string
}

const initialState: LoginState = {
  base64: '',
  code: '',
  sign: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateState(state, { payload }): LoginState {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { updateState } = loginSlice.actions;

export const getCaptcha = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await getCaptchaService();
    if (data) {
      dispatch(updateState(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = (loginData) => async () => {
  try {
    const res = await loginService(loginData);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const sendSms = (phone: string) => async () => {
  try {
    const res = await sendSmsService(phone);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = (resetData) => async () => {
  try {
    const res = await resetPasswordService(resetData);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default loginSlice.reducer;
