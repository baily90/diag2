import api from '../apis';
import request from '@/utils/request';

export function getCaptchaService() {
  return request.get(api.login.getCaptcha);
}

export function loginService(data) {
  return request.post(api.login.login, data);
}

export function sendSmsService(phone: string) {
  return request.post(api.login.sendSms, { phone });
}

export function resetPasswordService(data) {
  return request.post(api.login.resetPassword, data);
}
