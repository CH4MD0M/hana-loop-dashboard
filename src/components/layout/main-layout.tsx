'use client';

import { useEffect, useState } from 'react';

import Header from '../header/header';
import Navigation from '../navigation/navigation';
import { useNavigation } from '../navigation/_hooks/useNavigation';
import styles from './main-layout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const {
    isMobileDrawerOpen,
    openMobileDrawer,
    closeMobileDrawer,
    isSidebarCollapsed,
    toggleSidebar,
  } = useNavigation();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1074);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleMenuClick = () => {
    if (isMobile) {
      openMobileDrawer();
    } else {
      toggleSidebar();
    }
  };

  return (
    <div className={styles.layoutContainer}>
      {/* Header */}
      <Header onMenuClick={handleMenuClick} />

      <div className={styles.contentWrapper}>
        {/* Sidebar */}
        <Navigation
          isMobileDrawerOpen={isMobileDrawerOpen}
          onCloseMobileDrawer={closeMobileDrawer}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
