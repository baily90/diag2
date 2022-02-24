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
  handleReportService,
  getMesareicTemplateDataService,
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
  mesareicTemplateData: [], // 报告模板
  signImg: '', // 医生签名
  normalData: object // 一键正常配置
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
  mesareicTemplateData: [],
  signImg: '',
  normalData: null,
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

      const newSources = sources?.map((item) => {
        const isVedioFlag = ['视频', 2].includes(item.source_type);
        item.littleImg = isVedioFlag ? item.source_url_snapshot : item.source_url;
        return item;
      });
      const obj = {
        is_history: false,
        diag_id,
        check_id,
        is_danger: check?.is_danger, // 是否疑难报告 0:否,1:是
        is_withdraw, // 是否是撤回报告 0:正常报告，1:撤回报告
        nullifyAccess, // 是否有作废权限
        body_region_id: check?.body_region_id, // 部位id
        sources: newSources, // 资源
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
        mesareicTemplateData: [],
        signImg: '',
        normalData: null,
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
      const newSources = source?.map((item) => {
        const isVedioFlag = ['视频', 2].includes(item.source_type);
        item.littleImg = isVedioFlag ? item.source_url_snapshot : item.source_url;
        return item;
      });
      const newAISources = ai_source?.map((item) => {
        const isVedioFlag = ['视频', 2].includes(item.source_type);
        item.littleImg = isVedioFlag ? item.source_url_snapshot : item.source_url;
        return item;
      });
      const obj = {
        is_history: true,
        diag_id,
        check_id: check?.id,
        is_danger: check?.is_danger, // 是否疑难报告 0:否,1:是
        is_withdraw: 0, // 是否是撤回报告 0:正常报告，1:撤回报告
        nullifyAccess: 0, // 是否有作废权限
        body_region_id: check?.body_region_id, // 部位id
        sources: newSources, // 资源
        ai_source: newAISources,
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
        mesareicTemplateData: [],
        signImg: '',
        normalData: null,
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
 * 转交给其他人并获取下一份报告
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
 * 获取需要处理的下一份报告
 * @param check_id
 * @returns
 */
export const nextNeedReport = (check_id: number) => async () => {
  try {
    const res = await nextNeedReportService(check_id);
    return res;
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
/**
 * 发送报告
 * @param data
 * @returns
 */
export const handleReport = (data) => async () => {
  try {
    const res = await handleReportService(data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * 获取签章
 * @returns
 */
export const getSignImg = () => (dispatch: AppDispatch, getState: any) => {
  const signImg = getState().user?.info?.autograph;
  dispatch(updateState({ signImg }));
};

/**
 * 获取肠系膜淋巴结模板
 * @param diag_id
 * @returns
 */
export const getMesareicTemplateData = (diag_id: number) => async (dispatch: AppDispatch) => {
  // dispatch(updateState({
  //   mesareicTemplateData:
  //     [
  //       {
  //         key: 1,
  //         title: '肠系膜未见明显淋巴结回声',
  //         cssj: '脐周未探及明显淋巴结回声。',
  //         csts: '肠系膜未见明显淋巴结回声',
  //         jkjy: '健康，建议定期(半年)进行健康体检，超声随访，保持健康的生活习惯。',
  //         selected: false,
  //       },
  //       {
  //         key: 2,
  //         title: '肠系膜淋巴结肿大',
  //         cssj: '脐周可探及数枚低回声结节，大者约 * mm，形态规则，呈椭圆形，包膜光整，回声均匀，边界清，可/未见淋巴门。',
  //         csts: '肠系膜淋巴结肿大',
  //         jkjy: '中风险，建议遵医嘱结合实验室检查及相关治疗，结合中医中药调理，改善生活方式，定期 (1-3个月)进行健康检查及超声随访。',
  //         selected: false,
  //       },
  //       {
  //         key: 3,
  //         title: '肠系膜淋巴结可见',
  //         cssj: '脐周可探及数枚低回声结节，大者约 * mm，形态规则，呈椭圆形，包膜光整，回声均匀，边界清，可/未见淋巴门。',
  //         csts: '肠系膜淋巴结可见',
  //         jkjy: '低风险，建议结合中医中药调理，保持健康的生活方式，定期(3-6个月)进行健康检查及超声随访。',
  //         selected: false,
  //       },
  //     ],
  // }));

  try {
    const { code, data } = await getMesareicTemplateDataService(diag_id);
    if (code === 200) {
      if (data && data.length) {
        const temp = data.map((item) => {
          item.selected = false;
          return item;
        });
        dispatch(updateState({ mesareicTemplateData: temp }));
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default reportSlice.reducer;
