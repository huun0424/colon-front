import { GetReportResponse } from './type';

export const fetchGetReport = async (postId: number) => {
  const res = await fetch(`/api/report/${postId}`);
  const jsonData = (await res.json()) as GetReportResponse;
  return jsonData;
};
