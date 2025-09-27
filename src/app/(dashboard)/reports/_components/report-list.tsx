import dayjs from 'dayjs';

import { Report } from '@/types/Report';

import { useModalStore } from '@/store/use-modal-store';
import { getCompanyName } from '@/utils/report-list-utils';

import ReportModal from './report-modal';
import styles from './report-list.module.css';

interface ReportListProps {
  reportListData: Report[];
  onReortUpdated: (updatedReport: Report) => void;
}

const ReportList = ({ reportListData, onReortUpdated }: ReportListProps) => {
  const { openModal } = useModalStore(['openModal']);

  const formatDate = (dateString: string) => {
    const date = dayjs(dateString);
    return date.format('YY. MM. DD');
  };

  const getInitial = (name: string) => {
    return name.charAt(0);
  };

  const handleEditClick = (report: Report, event: React.MouseEvent) => {
    event.stopPropagation();

    openModal(
      'edit-report',
      <ReportModal mode="edit" report={report} onReportUpdated={onReortUpdated} />
    );
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerGrid}>
          <div className={styles.headerTitle}>제목</div>
          <div className={styles.headerTitle}>작성자</div>
          <div className={styles.headerTitle}>작성일</div>
          <div className={styles.headerTitle}>관리</div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {reportListData.map((report) => {
          const companyName = getCompanyName(report.resourceUid);

          return (
            <div key={report.id} className={styles.row}>
              <div className={styles.rowGrid}>
                {/* 제목 */}
                <div className={styles.titleSection}>
                  <h3 className={styles.title}>{report.title}</h3>
                  <p className={styles.description}>{report.content}</p>
                </div>

                {/* 작성자 */}
                <div className={styles.authorSection}>
                  <div className={styles.avatar}>{getInitial(companyName)}</div>
                  <span className={styles.authorName}>{companyName}</span>
                </div>

                {/* 작성일 */}
                <div className={styles.dateSection}>
                  <span className={styles.date}>{formatDate(report.dateTime)}</span>
                </div>

                {/* 관리 */}
                <div className={styles.editSection}>
                  <button onClick={(e) => handleEditClick(report, e)} className={styles.editButton}>
                    수정
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportList;
