import { createSlice } from '@reduxjs/toolkit';
import { getCaseDetailService, getCaseListService } from '@/services/patientCase';
import { AppDispatch } from '..';

interface PatientCaseState {
  isLoading: boolean,
  caseList: [],
}

const initialState: PatientCaseState = {
  isLoading: false,
  caseList: [],
};

export const patientCaseSlice = createSlice({
  name: 'patientCase',
  initialState,
  reducers: {
    updateState(state, { payload }): PatientCaseState {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { updateState } = patientCaseSlice.actions;

export const getCaseList = (params) => async (dispatch: AppDispatch) => {
  try {
    dispatch(updateState({ isLoading: true }));
    const { code, data } = await getCaseListService(params);
    if (code === 200) {
      const taskList = [];
      data.forEach((item) => {
        taskList.push(getCaseDetailService({
          report_id: item.reportId,
          hidden: 'upperHalf',
          is_diag_client: 1,
        }));
      });
      const res = await Promise.all(taskList);
      const temp = data.map((item, index) => {
        item.htmlText = res[index].data;
        return item;
      });
      dispatch(updateState({ caseList: temp }));
    }
    dispatch(updateState({ isLoading: false }));
    return { code: 200 };
  } catch (error) {
    dispatch(updateState({ isLoading: false }));
    console.log(error);
  }
};

export default patientCaseSlice.reducer;
