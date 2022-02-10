import api from '../apis';
import request from '@/utils/request';

export function getUserInfoService() {
  return request.get(api.user.getUserInfo);
}
