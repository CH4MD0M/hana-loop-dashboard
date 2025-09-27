'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Home, FileText, X } from 'lucide-react';

import styles from './mobile-side-bar.module.css';

interface MobileSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSideBar = ({ isOpen, onClose }: MobileSideBarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: '대시보드', href: '/', active: true },
    { icon: FileText, label: '보고서', href: '/reports' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={onClose} />}

      <aside
        className={`${styles.sidebarContainer} ${
          isOpen ? styles.sidebarOpen : styles.sidebarClosed
        }`}
      >
        <div className={styles.headerContainer}>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={16} className={styles.closeIcon} />
          </button>
        </div>

        <nav className={styles.navigation}>
          <ul className={styles.menuList}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`${styles.menuLink} ${
                      isActive ? styles.menuLinkActive : styles.menuLinkInactive
                    }`}
                  >
                    <Icon size={16} className={styles.menuIcon} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default MobileSideBar;
