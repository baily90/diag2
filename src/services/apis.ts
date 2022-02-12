export default {
  user: {
    getUserInfo: '/diag_doctor/mine',
  },
  editReport: {
    getDoctorCheck: (id) => `/diag_doctor/check/${id}`,
  },
  historyReport: {
    getHistoryReportList: (page) => `/diag_doctor/report_list/${page}`,
    getProductList: '/diag_doctor/product/list',
    withdrawReport: (id: number) => `/diag_doctor/withdraw/${id}`,
  },
};
