'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/types/Post';
import { fetchPosts } from '@/lib/api';

import MainLayout from '@/components/layout/main-layout';
import ReportStatus from './_components/report-status';
import SearchBar from './_components/search-bar';
import ReportList from './_components/report-list';

import styles from './reports-page.module.css';

export default function ReportsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handlePostCreated = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handlePostUpdated = (updatedPost: Post) => {
    setPosts((prev) => prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('게시글 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
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
        <ReportStatus reportListData={posts} onPostCreated={handlePostCreated} />
        <SearchBar />
        <ReportList reportListData={posts} onPostUpdated={handlePostUpdated} />
      </div>
    </MainLayout>
  );
}
