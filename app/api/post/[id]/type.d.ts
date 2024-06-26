import { JOB_GROUP_TYPES } from '../../auth/user/type';
import { POST_STATUS, POST_STATUS_TYPES } from '../type';

export interface GetPostResponse {
  id: number;
  status: POST_STATUS_TYPES;
  requested_major: JOB_GROUP_TYPES;
  title: string;
  body: string;
  preview_body: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  author_nickname: string;
  author_major: JOB_GROUP_TYPES;
  author_profile_url: string;
  accept_comment_id: number;
  success: boolean;
}

export interface UpdatePostRequest {
  id: number;
  status: POST_STATUS_TYPES;
  requested_major?: JOB_GROUP_TYPES | undefined;
  title?: string | undefined;
  body?: { data: string; created_at: string } | undefined;
  preview_body?: string | undefined;
  tags?: string[] | undefined;
  accept_comment_id?: number;
}

export interface UpdatePostResponse {
  success: boolean;
}

export interface DeletePostResponse {
  success: boolean;
}
