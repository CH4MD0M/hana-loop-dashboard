'use client';

import { Company } from '@/types/Company';
import styles from '../dashboard-page.module.css';
import localStyles from './top-companies.module.css';

interface TopCompaniesProps {
  companiesData: Company[];
  selectedYear: string;
}

interface CompanyRanking {
  id: string;
  name: string;
  achievementRate: number;
  totalEmissions: number;
  totalQuota: number;
}

const TopCompanies = ({ companiesData, selectedYear }: TopCompaniesProps) => {
  const rankings: CompanyRanking[] = companiesData
    .map((company) => {
      const yearEmissions = company.emissions.filter((e) =>
        e.yearMonth.startsWith(selectedYear.toString())
      );

      // 총 배출량
      const totalEmissions = yearEmissions.reduce((sum, e) => sum + e.emissions, 0);

      // 월 개수
      const monthsInYear = new Set(yearEmissions.map((e) => e.yearMonth)).size;

      // 총 할당량
      const totalQuota = company.monthlyQuota * monthsInYear;

      const achievementRate = totalQuota > 0 ? (totalEmissions / totalQuota) * 100 : 0;

      return {
        id: company.id,
        name: company.name,
        achievementRate,
        totalEmissions,
        totalQuota,
      };
    })
    .sort((a, b) => a.achievementRate - b.achievementRate);

  const maxAchievementRate = Math.max(...rankings.map((r) => r.achievementRate));

  return (
    <article className={styles.card}>
      <h2 className={styles.cardTitle}>우수 사업장</h2>
      <div className={styles.cardContent}>
        <div className={localStyles.rankingList}>
          {rankings.map((company, index) => (
            <div key={company.id} className={localStyles.rankingItem}>
              <div className={localStyles.rankingHeader}>
                <div className={localStyles.rankingInfo}>
                  <span className={localStyles.rank}>#{index + 1}</span>
                  <span className={localStyles.companyName}>{company.name}</span>
                </div>
                <span
                  className={
                    company.achievementRate <= 100
                      ? localStyles.achievementGood
                      : localStyles.achievementBad
                  }
                >
                  {company.achievementRate.toFixed(1)}%
                </span>
              </div>
              <div className={localStyles.barContainer}>
                <div
                  className={
                    company.achievementRate <= 100 ? localStyles.barGood : localStyles.barBad
                  }
                  style={{
                    width: `${(company.achievementRate / maxAchievementRate) * 100}%`,
                  }}
                />
              </div>
              <div className={localStyles.emissionInfo}>
                <span>
                  {company.totalEmissions.toLocaleString()} / {company.totalQuota.toLocaleString()}{' '}
                  tCO2eq
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default TopCompanies;
