import api from '../apis';
import request from '@/utils/request';

export function getDoctorCheckService(id) {
  return request.get(api.EditReport.getDoctorCheck(id));
}
