'use client';

import { useMemo } from 'react';

import { Company } from '@/types/Company';
import localStyles from './total-emissions.module.css';
import styles from '../dashboard-page.module.css';

interface TotalEmissionsProps {
  companiesData: Company[];
}

const TotalEmissions = ({ companiesData }: TotalEmissionsProps) => {
  const totalEmissions = useMemo(
    () =>
      companiesData.reduce((total, company) => {
        const companyTotal = company.emissions.reduce(
          (sum, emission) => sum + emission.emissions,
          0
        );
        return total + companyTotal;
      }, 0),
    [companiesData]
  );

  const formatNumber = (num: number) => {
    return num.toLocaleString('ko-KR');
  };

  return (
    <article className={`${styles.card} ${localStyles.card}`}>
      <h2 className={styles.cardTitle}>총 배출량</h2>
      <div className={styles.cardContent}>
        <div className={localStyles.section}>
          <div className={localStyles.totalEmissionsValue}>{formatNumber(totalEmissions)}</div>
          <div className={localStyles.totalEmissionsUnit}>tCO2eq</div>
        </div>
      </div>
    </article>
  );
};

export default TotalEmissions;
