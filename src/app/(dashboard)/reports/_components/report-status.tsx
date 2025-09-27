'use client';

import dayjs from 'dayjs';
import { Clock, FileText, Plus } from 'lucide-react';

import { Post } from '@/types/Post';
import { useModalStore } from '@/store/use-modal-store';

import ReportModal from './report-modal';
import styles from './report-status.module.css';

interface ReportStatusProps {
  reportListData: Post[];
  onPostCreated: (newPost: Post) => void;
}

const ReportStatus = ({ reportListData, onPostCreated }: ReportStatusProps) => {
  const totalPosts = reportListData.length;

  const recentPosts = reportListData.filter((post) => {
    const postDate = dayjs(post.dateTime);
    const weekAgo = dayjs().subtract(7, 'day');
    return postDate.isAfter(weekAgo);
  }).length;

  const { openModal } = useModalStore(['openModal']);

  const onCreateReport = () => {
    openModal('create-post', <ReportModal mode="create" onPostCreated={onPostCreated} />);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.cardTitle}>전체 보고서</span>
        <div className={`${styles.cardContent} ${styles.totalReportsIcon}`}>
          <FileText size={24} />
          <p className={styles.cardNumber}>{totalPosts}</p>
        </div>
      </div>

      <div className={styles.card}>
        <span className={styles.cardTitle}>최근 7일</span>
        <div className={`${styles.cardContent} ${styles.recentReportsIcon}`}>
          <Clock size={24} />
          <p className={styles.cardNumber}>{recentPosts}</p>
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
