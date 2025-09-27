import { Filter } from 'lucide-react';

import styles from './search-bar.module.css';

const SearchBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.controlsSection}>
          <button className={styles.filterButton}>
            <Filter size={18} />
            필터
          </button>
          <select className={styles.sortSelect}>
            <option>최신순</option>
            <option>오래된순</option>
            <option>제목순</option>
            <option>작성자순</option>
          </select>
        </div>
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="보고서 제목, 작성자로 검색"
            className={styles.searchInput}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
