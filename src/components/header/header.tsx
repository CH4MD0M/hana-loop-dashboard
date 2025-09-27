import Image from 'next/image';
import { MenuIcon } from 'lucide-react';
import styles from './header.module.css';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.leftSection}>
          <button className={styles.menuButton} onClick={onMenuClick} type="button">
            <MenuIcon size={16} className={styles.menuIcon} />
          </button>

          <div className={styles.logoSection}>
            <Image src="/hanaloop-logo.png" width={40} height={20} alt="logo" aria-label="로고" />
            <span className={styles.logoText}>Hana loop</span>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
