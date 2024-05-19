import {
  GetPostListQuery,
  GetPostListResponse,
  InsertPostRequest,
  InsertPostResponse,
} from './type';

export const fetchInsertPost = async (body: InsertPostRequest) => {
  const res = await fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const jsonData = (await res.json()) as InsertPostResponse;
  return jsonData;
};

export const fetchGetPostList = async (query: GetPostListQuery) => {
  const res = await fetch(`/api/post?order=${query.order}&offset=${query.offset}`);
  const jsonData = (await res.json()) as GetPostListResponse;
  return jsonData;
};
