import { createSlice } from '@reduxjs/toolkit';
import {
  getEditReportInfoService,
  getReportDetailInfoService,
  getNextReportService,
  handToOthersService,
  nextNeedReportService,
  getDestroyTypeService,
  destroyReportService,
  continueReportService,
  cancleReportService,
  getMarkDataService,
} from '@/services/report/index';
import { AppDispatch } from '..';

interface ReportState {
  is_loading: boolean, // 是否在加载
  is_history: boolean, // 是否是历史
  diag_id: number, // 报告id
  check_id: number, // 检查单id
  is_danger: number, // 是否疑难报告 0:否,1:是
  is_withdraw: number, // 是否是撤回报告 0:正常报告，1:撤回报告
  nullifyAccess: number, // 是否有作废权限
  body_region_id: number, // 部位id
  sources: [], // 资源
  ai_source: [],
  scan_comment: object, // 扫查留言
  patientReport: number, // 是否显示患者历史病例 0:不显示,1:显示
  report_detail_html: string, // 报告详情dom文本
  patient: {
    name: string,
    gender: number // 1:男,2:女
    age: number
    age_unit: number // 0:岁,1:月,2:天
    product_name: string,
    create_time: number
  },
  remain_time: number, // 报告剩余处理时间
  position_info: object, // 左右侧颈动脉内中膜厚度
  destoryTypes: [], // 作废报告类型
  mark_data: [], // 标注信息
  templateData: [] // 报告模板
}

const initialState: ReportState = {
  is_loading: true,
  is_history: false,
  diag_id: 0,
  check_id: 0,
  is_danger: 0, // 是否疑难报告 0:否,1:是
  is_withdraw: 0, // 是否是撤回报告 0:正常报告，1:撤回报告
  nullifyAccess: 0, // 是否有作废权限
  body_region_id: 0, // 部位id
  sources: [], // 资源
  ai_source: [],
  scan_comment: {}, // 扫查留言
  patientReport: 0, // 是否显示患者历史病例 0:不显示,1:显示
  report_detail_html: '', // 报告详情dom文本
  patient: {
    name: '',
    gender: 1, // 1:男,2:女
    age: 0,
    age_unit: 0, // 0:岁,1:月,2:天
    product_name: '',
    create_time: 0,
  },
  remain_time: 600,
  position_info: {},
  destoryTypes: [],
  mark_data: [],
  templateData: [],
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    updateState(state, { payload }): ReportState {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { updateState } = reportSlice.actions;

/**
 * 获取诊断报告
 * @param check_id
 * @returns
 */
export const getEditReportInfo = (check_id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(updateState({ is_loading: true }));
    const { data } = await getEditReportInfoService(check_id);
    if (data) {
      const {
        diag_id,
        check,
        patient,
        is_withdraw,
        nullifyAccess,
        sources,
        scan_comment,
        patientReport,
        position_info,
        remain_time,
      } = data;
      const obj = {
        is_history: false,
        diag_id,
        check_id,
        is_danger: check?.is_danger, // 是否疑难报告 0:否,1:是
        is_withdraw, // 是否是撤回报告 0:正常报告，1:撤回报告
        nullifyAccess, // 是否有作废权限
        body_region_id: check?.body_region_id, // 部位id
        sources, // 资源
        ai_source: [],
        scan_comment, // 扫查留言
        patientReport, // 是否显示患者历史病例 0:不显示,1:显示
        report_detail_html: '', // 报告详情dom文本
        patient: {
          name: patient?.name,
          gender: patient?.gender, // 1:男,2:女
          age: patient?.age,
          age_unit: patient?.age_unit, // 0:岁,1:月,2:天
          product_name: check?.product_name,
          create_time: check?.create_time,
        },
        remain_time,
        position_info,
        destoryTypes: [],
        mark_data: [],
        templateData: [],
      };
      dispatch(updateState(obj));
      dispatch(updateState({ is_loading: false }));
    }
  } catch (error) {
    dispatch(updateState({ is_loading: false }));
    console.log(error);
  }
};

/**
 * 获取报告详情
 * @param diag_id
 * @returns
 */
export const getReportDetailInfo = (diag_id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(updateState({ is_loading: true }));
    const { data } = await getReportDetailInfoService(diag_id);
    if (data) {
      const {
        check, patient, source, patientReport, report_detail_html, ai_source, product_name,
      } = data;
      const obj = {
        is_history: true,
        diag_id,
        check_id: check?.id,
        is_danger: check?.is_danger, // 是否疑难报告 0:否,1:是
        is_withdraw: 0, // 是否是撤回报告 0:正常报告，1:撤回报告
        nullifyAccess: 0, // 是否有作废权限
        body_region_id: check?.body_region_id, // 部位id
        sources: source, // 资源
        ai_source,
        scan_comment: {}, // 扫查留言
        patientReport, // 是否显示患者历史病例 0:不显示,1:显示
        report_detail_html, // 报告详情dom文本
        patient: {
          name: patient?.name,
          gender: patient?.gender, // 1:男,2:女
          age: patient?.age,
          age_unit: patient?.age_unit, // 0:岁,1:月,2:天
          product_name,
          create_time: check?.create_time,
        },
        remain_time: 600,
        position_info: {},
        destoryTypes: [],
        mark_data: [],
        templateData: [],
      };
      dispatch(updateState(obj));
      dispatch(updateState({ is_loading: false }));
    }
  } catch (error) {
    dispatch(updateState({ is_loading: false }));
    console.log(error);
  }
};

/**
 * 获取下一份报告
 * @param diag_id
 * @returns
 */
export const getNextReport = (diag_id: number) => async () => {
  try {
    const res = await getNextReportService(diag_id);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * 转交给其他人
 * @param check_id
 * @returns
 */
export const handToOthers = (check_id: number) => async () => {
  try {
    const { code } = await handToOthersService(check_id);
    if (code === 200) {
      const res = await nextNeedReportService(check_id);
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * 获取作废报告下拉选项
 * @returns
 */
export const getDestroyType = () => async (dispatch: AppDispatch) => {
  try {
    const { code, data } = await getDestroyTypeService();
    if (code === 200) {
      dispatch(updateState({ destoryTypes: data }));
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * 作废报告
 * @param data
 * @returns
 */
export const destroyReport = (data) => async () => {
  try {
    const { code } = await destroyReportService(data);
    if (code === 200) {
      const res = await nextNeedReportService(data?.check_id);
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * 继续出具报告
 * @param diag_id
 * @returns
 */
export const continueReport = (diag_id: number) => async () => {
  try {
    const res = await continueReportService(diag_id);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * 取消报告
 * @param diag_id
 * @returns
 */
export const cancleReport = (diag_id: number) => async () => {
  try {
    const res = await cancleReportService(diag_id);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * 获取测量的数据
 * @param diag_id
 * @returns
 */
export const getMarkData = (diag_id: number) => async (dispatch: AppDispatch) => {
  try {
    const { code, data } = await getMarkDataService(diag_id);
    if (code === 200) {
      dispatch(updateState({ mark_data: (data?.mark_data) || [] }));
    }
  } catch (error) {
    console.log(error);
  }
};

export default reportSlice.reducer;
