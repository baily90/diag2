import { createSlice } from '@reduxjs/toolkit';
import { getUserInfoService } from '@/services/user';
import { AppDispatch } from '..';

interface UserState {
  base: object,
  info: object,
  is_new: boolean
}

const initialState: UserState = {
  base: {},
  info: {},
  is_new: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateState(state, { payload }): UserState {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { updateState } = userSlice.actions;

export const getUserInfo = () => async (dispatch: AppDispatch) => {
  const { data } = await getUserInfoService();
  if (data) {
    dispatch(updateState(data));
  }
};

export default userSlice.reducer;
