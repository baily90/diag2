import api from '../apis';
import request from '@/utils/request';

export function getSignUrlService(url: string) {
  return request.get(api.oss.getSignUrl, { params: { object: url } });
}

export function getOssTokenService(scene: string) {
  return request.get(api.oss.getOssToken, { params: { scene } });
}
