import api from '../apis';
import request from '@/utils/request';

export function getHistoryReportListServive({ page, ...params }) {
  return request.get(api.historyReport.getHistoryReportList(page), { params });
}

export function getProductListServive() {
  return request.get(api.historyReport.getProductList);
}
