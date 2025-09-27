'use client';

import MobileSideBar from './mobile-side-bar';
import Sidebar from './side-bar';

import styles from './navigation.module.css';

interface NavigationProps {
  isMobileDrawerOpen: boolean;
  onCloseMobileDrawer: () => void;
  isSidebarCollapsed: boolean;
}

const Navigation = ({
  isMobileDrawerOpen,
  onCloseMobileDrawer,
  isSidebarCollapsed,
}: NavigationProps) => {
  return (
    <>
      <div className={styles.mobileContainer}>
        <MobileSideBar isOpen={isMobileDrawerOpen} onClose={onCloseMobileDrawer} />
      </div>

      <div className={styles.desktopContainer}>
        <Sidebar isCollapsed={isSidebarCollapsed} />
      </div>
    </>
  );
};

export default Navigation;
