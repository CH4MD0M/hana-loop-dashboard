'use client';

import { SyncLoader } from 'react-spinners';

import MainLayout from '@/components/layout/main-layout';
import { useDashboardData } from './_hooks/use-dashboard-data';
import styles from './dashboard-page.module.css';
import HeaderControls from './_components/header-controls';
import TotalEmissions from './_components/total-emissions';
import ScopeChart from './_components/scope-chart';
import MonthlyFuelEmissions from './_components/monthly-fuel-emissions';
import GoalAchievement from './_components/goal-achievement';
import TopCompanies from './_components/top-companies';

export default function Home() {
  const {
    selectedYear,
    setSelectedYear,
    selectedCompany,
    setSelectedCompany,
    companies,
    filteredCompanies,
    loading,
  } = useDashboardData();

  if (loading) {
    return (
      <MainLayout>
        <div className="loadingContainer">
          <SyncLoader color="#67d2a5" size={20} />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>하나루프 대시보드</h1>
          <HeaderControls
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            companies={companies}
          />
        </header>

        <section className={styles.topSection}>
          <TotalEmissions companiesData={filteredCompanies} />
          <ScopeChart companiesData={filteredCompanies} />
          <TopCompanies companiesData={companies} selectedYear={selectedYear} />
        </section>

        <section className={styles.bottomSection}>
          <MonthlyFuelEmissions companiesData={filteredCompanies} />

          <GoalAchievement companiesData={filteredCompanies} selectedCompany={selectedCompany} />
        </section>
      </div>
    </MainLayout>
  );
}
