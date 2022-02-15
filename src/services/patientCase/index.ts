import api from '../apis';
import request from '@/utils/request';

export function getCaseListService(params) {
  return request.get(api.patientCase.getCaseList, { params });
}

export function getCaseDetailService(params) {
  return request.get(api.patientCase.getCaseDetail, { params });
}
