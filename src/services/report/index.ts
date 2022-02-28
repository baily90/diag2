import api from '../apis';
import request from '@/utils/request';

export function getEditReportInfoService(check_id: number) {
  return request.get(api.report.getEditReportInfo(check_id));
}

export function getReportDetailInfoService(diag_id: number) {
  return request.get(api.report.getReportDetailInfo(diag_id));
}

export function getNextReportService(diag_id: number) {
  return request.post(api.report.getNextReport, { id: diag_id });
}

export function handToOthersService(check_id: number) {
  return request.post(api.report.handToOthers(check_id));
}

export function nextNeedReportService(check_id: number) {
  return request.post(api.report.nextNeedReport, { id: check_id });
}

export function getDestroyTypeService() {
  return request.get(api.report.getDestroyType);
}

export function destroyReportService(data) {
  return request.post(api.report.destroyReport, data);
}

export function cancleReportService(diag_id: number) {
  return request.post(api.report.cancleReport, { diag_id });
}

export function continueReportService(diag_id: number) {
  return request.post(api.report.continueReport, { diag_id });
}

export function getMarkDataService(diag_id: number) {
  return request.get(api.report.getMarkData, { params: { report_id: diag_id } });
}

export function sendMarkDataService(data) {
  return request.post(api.report.getMarkData, data);
}

export function handleReportService(data) {
  return request.post(api.report.handleReport, data);
}

export function getMesareicTemplateDataService(diag_id: number) {
  return request.get(api.report.mesareicTemplateData, { params: { diag_id } });
}

export function getReportConfService(checkId: number) {
  return request.get(api.report.getReportConf, { params: { checkId } });
}
