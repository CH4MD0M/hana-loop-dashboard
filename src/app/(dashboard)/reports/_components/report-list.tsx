import dayjs from 'dayjs';

import { Post } from '@/types/Post';
import { getCompanyName } from '@/utils/report-list-utils';
import styles from './report-list.module.css';

interface ReportListProps {
  reportListData: Post[];
}

const ReportList = ({ reportListData }: ReportListProps) => {
  const formatDate = (dateString: string) => {
    const date = dayjs(dateString);
    return date.format('YY. MM. DD');
  };

  const getInitial = (name: string) => {
    return name.charAt(0);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerGrid}>
          <div className={styles.headerTitle}>제목</div>
          <div className={styles.headerTitle}>작성자</div>
          <div className={styles.headerTitle}>작성일</div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {reportListData.map((post) => {
          const companyName = getCompanyName(post.resourceUid);

          return (
            <div key={post.id} className={styles.row}>
              <div className={styles.rowGrid}>
                {/* 제목 */}
                <div className={styles.titleSection}>
                  <h3 className={styles.title}>{post.title}</h3>
                  <p className={styles.description}>{post.content}</p>
                </div>

                {/* 작성자 */}
                <div className={styles.authorSection}>
                  <div className={styles.avatar}>{getInitial(companyName)}</div>
                  <span className={styles.authorName}>{companyName}</span>
                </div>

                {/* 작성일 */}
                <div className={styles.dateSection}>
                  <span className={styles.date}>{formatDate(post.dateTime)}</span>
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
