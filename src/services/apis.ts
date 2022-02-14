export default {
  user: {
    getUserInfo: '/diag_doctor/mine',
  },
  report: {
    getEditReportInfo: (check_id: number) => `/diag_doctor/check/${check_id}`,
    getReportDetailInfo: (diag_id: number) => `/diag_doctor/report_ai/${diag_id}`,
    getNextReport: '/diag_doctor/next_report',
    handToOthers: (check_id: number) => `/diag_doctor/check_repost/${check_id}`,
    nextNeedReport: '/diag_doctor/next_need_report',
    getDestroyType: '/diag_doctor/nullify_maps',
    destroyReport: '/diag_doctor/check_nullify',
    cancleReport: '/diag_doctor/cancel/diag',
    continueReport: '/diag_doctor/continue/diag',
  },
  historyReport: {
    getHistoryReportList: (page: number) => `/diag_doctor/report_list/${page}`,
    getProductList: '/diag_doctor/product/list',
    withdrawReport: (id: number) => `/diag_doctor/withdraw/${id}`,
  },
};
