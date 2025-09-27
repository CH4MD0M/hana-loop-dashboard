import { useState } from 'react';

export const useNavigation = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return {
    isMobileDrawerOpen,
    isSidebarCollapsed,
    openMobileDrawer: () => setIsMobileDrawerOpen(true),
    closeMobileDrawer: () => setIsMobileDrawerOpen(false),
    toggleSidebar: () => setIsSidebarCollapsed(!isSidebarCollapsed),
  };
};
