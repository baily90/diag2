import { createSlice } from '@reduxjs/toolkit';
import { getHomeInfoService, makeOnlineService, mineCheckWantService } from '@/services/home';
import { AppDispatch } from '..';

interface HomeState {
  count1: number,
  count2: number,
  count3: number,
  count4: number,
  count5: number,
  count6: number,
}

const initialState: HomeState = {
  count1: 0,
  count2: 0,
  count3: 0,
  count4: 0,
  count5: 0,
  count6: 0,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    updateState(state, { payload }): HomeState {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { updateState } = homeSlice.actions;

export const getHomeInfo = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await getHomeInfoService();
    if (data) {
      dispatch(updateState(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const dealReport = () => async (dispatch: AppDispatch) => {
  try {
    const { code: code1 } = await makeOnlineService();
    const { code: code2, data } = await mineCheckWantService();
    if (code1 === 200 && code2 === 200 && data.length) {
      return data[0];
    }
  } catch (error) {
    console.log(error);
  }
};

export default homeSlice.reducer;
