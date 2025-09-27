import { z } from 'zod';

export const reportFormSchema = z.object({
  resourceUid: z.string().min(1, '회사를 선택해주세요'),
  title: z.string().min(1, '제목은 필수입니다').max(200, '제목은 200자를 초과할 수 없습니다'),
  content: z.string().min(1, '내용은 필수입니다').max(10000, '내용은 10000자를 초과할 수 없습니다'),
});

export type ReportFormData = z.infer<typeof reportFormSchema>;

export interface ReportData {
  title: string;
  resourceUid: string;
  dateTime: string;
  content: string;
}

export const getDefaultReportValues = (): ReportFormData => ({
  resourceUid: '',
  title: '',
  content: '',
});

export const transformToReportData = (formData: ReportFormData): ReportData => ({
  title: formData.title,
  resourceUid: formData.resourceUid,
  dateTime: new Date().toISOString(),
  content: formData.content,
});
