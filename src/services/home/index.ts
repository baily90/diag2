import api from '../apis';
import request from '@/utils/request';

export function getHomeInfoService() {
  return request.get(api.home.getHomeInfo);
}

export function makeOnlineService() {
  return request.post(api.home.makeOnline);
}

export function mineCheckWantService() {
  return request.get(api.home.mineCheckWant);
}
