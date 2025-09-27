import { companies } from '@/lib/data/companies';

export const getCompanyById = (id: string) => {
  return companies.find((company) => company.id === id);
};

export const getCompanyName = (resourceUid: string) => {
  const company = getCompanyById(resourceUid);
  return company ? company.name : 'Unknown Company';
};
