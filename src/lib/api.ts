import { type Report } from '@/types/Report';

import { reports } from './data/reports';
import { companies } from './data/companies';

const _companies = [...companies];
let _reports = [...reports];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const jitter = () => 200 + Math.random() * 600;

const maybeFail = () => Math.random() < 0.15;

export async function fetchCompanies() {
  await delay(jitter());
  return _companies;
}

export async function fetchReports() {
  await delay(jitter());
  // 날짜 기준으로 최신순 정렬
  return _reports.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
}

export async function createOrUpdateReport(p: Omit<Report, 'id'> & { id?: string }) {
  await delay(jitter());

  if (maybeFail()) throw new Error('Save failed');

  if (p.id) {
    const index = _reports.findIndex((x) => x.id === p.id);
    if (index === -1) throw new Error('Report not found');

    _reports[index] = p as Report;
    return p as Report;
  }

  const created = { ...p, id: crypto.randomUUID() };
  _reports = [..._reports, created];
  return created;
}
