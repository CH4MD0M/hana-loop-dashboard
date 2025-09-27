'use client';

import { useEffect, useState } from 'react';
import { Report } from '@/types/Report';
import { fetchReports } from '@/lib/api';

import MainLayout from '@/components/layout/main-layout';
import ReportStatus from './_components/report-status';
import SearchBar from './_components/search-bar';
import ReportList from './_components/report-list';

import styles from './reports-page.module.css';

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleReportCreated = (newReport: Report) => {
    setReports((prev) => [newReport, ...prev]);
  };

  const handleReportUpdated = (updatedReport: Report) => {
    setReports((prev) =>
      prev.map((report) => (report.id === updatedReport.id ? updatedReport : report))
    );
  };

  useEffect(() => {
    const loadReports = async () => {
      try {
        const fetchedReports = await fetchReports();
        setReports(fetchedReports);
      } catch (error) {
        console.error('게시글 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReports();
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div>게시글을 불러오는 중...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <ReportStatus reportListData={reports} onReportCreated={handleReportCreated} />
        <SearchBar />
        <ReportList reportListData={reports} onReortUpdated={handleReportUpdated} />
      </div>
    </MainLayout>
  );
}
