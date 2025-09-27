'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText } from 'lucide-react';

import styles from './side-bar.module.css';

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: '대시보드', href: '/' },
    { icon: FileText, label: '보고서', href: '/reports' },
  ];

  return (
    <aside
      className={`${styles.sidebarContainer} ${
        isCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded
      }`}
    >
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${isActive ? styles.linkActive : styles.linkInactive}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={24} className={styles.iconWrapper} />
                  <span
                    className={`${styles.linkText} ${
                      isCollapsed ? styles.textHidden : styles.textVisible
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
