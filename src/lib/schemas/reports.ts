import { z } from 'zod';

export const createPostSchema = z.object({
  resourceUid: z.string().min(1, '회사를 선택해주세요'),
  title: z.string().min(1, '제목은 필수입니다').max(200, '제목은 200자를 초과할 수 없습니다'),
  content: z.string().min(1, '내용은 필수입니다').max(10000, '내용은 10000자를 초과할 수 없습니다'),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;

export interface PostData {
  title: string;
  resourceUid: string;
  dateTime: string;
  content: string;
}

export const getDefaultPostValues = (): CreatePostFormData => ({
  resourceUid: '',
  title: '',
  content: '',
});

export const transformToPostData = (formData: CreatePostFormData): PostData => ({
  title: formData.title,
  resourceUid: formData.resourceUid,
  dateTime: new Date().toISOString(),
  content: formData.content,
});
