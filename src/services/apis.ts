export default {
  user: {
    getUserInfo: '/diag_doctor/mine', // 获取登录用户信息
  },
  report: {
    getEditReportInfo: (check_id: number) => `/diag_doctor/check/${check_id}`, // 诊断获取报告
    getReportDetailInfo: (diag_id: number) => `/diag_doctor/report_ai/${diag_id}`, // 获取历史报告详情
    getNextReport: '/diag_doctor/next_report', // 下一份历史报告
    handToOthers: (check_id: number) => `/diag_doctor/check_repost/${check_id}`, // 疑难报告转交给他人
    nextNeedReport: '/diag_doctor/next_need_report', // 获取需要处理的下一份报告
    getDestroyType: '/diag_doctor/nullify_maps', // 获取作废报告原因类型
    destroyReport: '/diag_doctor/check_nullify', // 作废报告
    cancleReport: '/diag_doctor/cancel/diag', // 超时取消报告
    continueReport: '/diag_doctor/continue/diag', // 超时继续处理
    getMarkData: '/diag_doctor/mark/data', // 获取历史报告已标注的信息
    sendMarkData: '/diag_doctor/mark/data', // 发送标注信息
    handleReport: '/diag_doctor/report/handle', // 发送报告
    mesareicTemplateData: '/diag_doctor/report/template', // 肠系膜淋巴结报告模板
  },
  historyReport: {
    getHistoryReportList: (page: number) => `/diag_doctor/report_list/${page}`, // 获取历史报告列表
    getProductList: '/diag_doctor/product/list', // 获取历史报告列表筛选项中的产品名称
    withdrawReport: (id: number) => `/diag_doctor/withdraw/${id}`, // 撤回报告
  },
  home: {
    getHomeInfo: '/diag_doctor/report_mixed', // 获取数量信息
    makeOnline: '/diag_doctor/make_online',
    mineCheckWant: '/diag_doctor/mine_check_want', // 获取需要处理的第一份报告
  },
  login: {
    getCaptcha: '/diag_doctor/captcha_center', // 获取验证码
    login: '/diag_doctor/login', // 登录
    sendSms: '/diag_doctor/send_sms', // 获取短信验证码
    resetPassword: '/diag_doctor/find_pass', // 重置密码
    changePassword: '/diag_doctor/change_password', // 修改密码
  },
  patientCase: {
    getCaseList: '/diag_doctor/patient/report-list', // 获取患者历史病例
    getCaseDetail: '/diag_doctor/report/detail', // 获取患者历史病例详情
  },
  oss: {
    getSignUrl: '/diag_doctor/sign_url', // 获取私有化的资源链接
    getOssToken: '/diag_doctor/sts', // 获取oss token
  },
};
