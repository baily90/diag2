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
    getMarkData: '/diag_doctor/mark/data',
  },
  historyReport: {
    getHistoryReportList: (page: number) => `/diag_doctor/report_list/${page}`,
    getProductList: '/diag_doctor/product/list',
    withdrawReport: (id: number) => `/diag_doctor/withdraw/${id}`,
  },
  home: {
    getHomeInfo: '/diag_doctor/report_mixed',
    makeOnline: '/diag_doctor/make_online',
    mineCheckWant: '/diag_doctor/mine_check_want',
  },
  login: {
    getCaptcha: '/diag_doctor/captcha_center',
    login: '/diag_doctor/login',
    sendSms: '/diag_doctor/send_sms',
    resetPassword: '/diag_doctor/find_pass',
    changePassword: '/diag_doctor/change_password',
  },
  patientCase: {
    getCaseList: '/diag_doctor/patient/report-list',
    getCaseDetail: '/diag_doctor/report/detail',
  },
};
