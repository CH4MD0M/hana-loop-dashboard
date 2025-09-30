'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Company } from '@/types/Company';
import styles from './header-controls.module.css';

interface HeaderControlsProps {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedCompany: string | null;
  setSelectedCompany: (companyId: string | null) => void;
  companies: Company[];
}

const HeaderControls = ({
  selectedYear,
  setSelectedYear,
  selectedCompany,
  setSelectedCompany,
  companies,
}: HeaderControlsProps) => {
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCompanySelect = (companyId: string | null) => {
    setSelectedCompany(companyId);
    setShowCompanyDropdown(false);
  };

  const getSelectedCompanyName = () => {
    if (!selectedCompany) return '기업전체';
    const company = companies.find((c) => c.id === selectedCompany);
    return company?.name || '기업전체';
  };

  // 외부 클릭 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCompanyDropdown(false);
      }
    };

    if (showCompanyDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCompanyDropdown]);

  return (
    <div className={styles.headerControls}>
      <div className={styles.yearSelector}>
        <span>기준 연도</span>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          {['2024', '2025'].map((year) => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </select>
      </div>

      <div className={styles.controls}>
        <button
          onClick={() => handleCompanySelect(null)}
          className={selectedCompany === null ? styles.active : ''}
        >
          기업전체
        </button>

        <div className={styles.dropdown} ref={dropdownRef}>
          <button
            onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
            className={selectedCompany !== null ? styles.active : ''}
          >
            {selectedCompany ? getSelectedCompanyName() : '사업장별'}
          </button>

          <AnimatePresence>
            {showCompanyDropdown && (
              <motion.div
                className={styles.dropdownMenu}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{
                  duration: 0.15,
                  ease: 'easeOut',
                }}
              >
                {companies.map((company, index) => (
                  <motion.button
                    key={company.id}
                    onClick={() => handleCompanySelect(company.id)}
                    className={selectedCompany === company.id ? styles.active : ''}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.02,
                      duration: 0.1,
                    }}
                    whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {company.name}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HeaderControls;
