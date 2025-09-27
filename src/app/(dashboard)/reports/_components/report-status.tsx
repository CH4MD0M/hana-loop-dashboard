'use client';

import dayjs from 'dayjs';
import { Clock, FileText, Plus } from 'lucide-react';

import { Report } from '@/types/Report';
import { useModalStore } from '@/store/use-modal-store';

import ReportModal from './report-modal';
import styles from './report-status.module.css';

interface ReportStatusProps {
  reportListData: Report[];
  onReportCreated: (newReport: Report) => void;
}

const ReportStatus = ({ reportListData, onReportCreated }: ReportStatusProps) => {
  const totalReports = reportListData.length;

  const recentReports = reportListData.filter((report) => {
    const reportDate = dayjs(report.dateTime);
    const weekAgo = dayjs().subtract(7, 'day');
    return reportDate.isAfter(weekAgo);
  }).length;

  const { openModal } = useModalStore(['openModal']);

  const onCreateReport = () => {
    openModal('create-report', <ReportModal mode="create" onReportCreated={onReportCreated} />);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.cardTitle}>전체 보고서</span>
        <div className={`${styles.cardContent} ${styles.totalReportsIcon}`}>
          <FileText size={24} />
          <p className={styles.cardNumber}>{totalReports}</p>
        </div>
      </div>

      <div className={styles.card}>
        <span className={styles.cardTitle}>최근 7일</span>
        <div className={`${styles.cardContent} ${styles.recentReportsIcon}`}>
          <Clock size={24} />
          <p className={styles.cardNumber}>{recentReports}</p>
        </div>
      </div>

      <button onClick={onCreateReport} className={styles.createButton}>
        <div className={styles.buttonIcon}>
          <Plus size={20} />
        </div>
        <span className={styles.buttonText}>보고서 작성</span>
      </button>
    </div>
  );
};

export default ReportStatus;
