import { useEffect, useMemo, useState } from 'react';

import { fetchCompanies } from '@/lib/api';
import { Company } from '@/types/Company';

export const useDashboardData = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  const filteredCompanies = useMemo(() => {
    // 회사별 필터링
    const companyFiltered = selectedCompany
      ? companies.filter((company) => company.id === selectedCompany)
      : companies;

    // 각 회사의 배출 데이터를 연도별로 필터링
    return companyFiltered.map((company) => ({
      ...company,
      emissions: company.emissions.filter((emission) =>
        emission.yearMonth.startsWith(selectedYear)
      ),
    }));
  }, [companies, selectedYear, selectedCompany]);

  return {
    companies,
    loading,
    selectedYear,
    selectedCompany,
    filteredCompanies,
    setSelectedYear,
    setSelectedCompany,
    isAllCompaniesSelected: () => selectedCompany === null,
  };
};
