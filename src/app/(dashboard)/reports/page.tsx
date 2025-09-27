import { fetchPosts } from '@/lib/api';
import MainLayout from '@/components/layout/main-layout';

import ReportStatus from './_components/report-status';
import SearchBar from './_components/search-bar';
import ReportList from './_components/report-list';

import styles from './reports-page.module.css';

export default async function ReportsPage() {
  const posts = await fetchPosts();

  return (
    <MainLayout>
      <div className={styles.container}>
        <ReportStatus reportListData={posts} />
        <SearchBar />
        <ReportList reportListData={posts} />
      </div>
    </MainLayout>
  );
}
