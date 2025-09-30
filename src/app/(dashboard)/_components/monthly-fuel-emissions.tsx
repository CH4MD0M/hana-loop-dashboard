'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import { Company } from '@/types/Company';
import styles from '../dashboard-page.module.css';

interface MonthlyFuelData {
  month: string;
  전력?: number;
  도시가스?: number;
  경유?: number;
  프로판?: number;
  실내등유?: number;
  국내무연탄?: number;
}

interface MonthlyFuelEmissionsProps {
  companiesData: Company[];
}

const MonthlyFuelEmissions = ({ companiesData }: MonthlyFuelEmissionsProps) => {
  // 월별 연료별 데이터 계산
  const monthlyFuelData = companiesData.reduce((acc, company) => {
    company.emissions.forEach((emission) => {
      const existingMonth = acc.find((item) => item.month === emission.yearMonth);

      if (existingMonth) {
        existingMonth[emission.source] = (existingMonth[emission.source] || 0) + emission.emissions;
      } else {
        acc.push({
          month: emission.yearMonth,
          [emission.source]: emission.emissions,
        });
      }
    });
    return acc;
  }, [] as MonthlyFuelData[]);

  // 월별로 정렬
  const sortedData = monthlyFuelData.sort((a, b) => a.month.localeCompare(b.month));

  // 연료 타입
  const fuelTypes = Array.from(
    new Set(
      companiesData.flatMap((company) => company.emissions.map((emission) => emission.source))
    )
  );

  const fuelColors = {
    전력: '#3b82f6',
    도시가스: '#06b6d4',
    경유: '#10b981',
    프로판: '#f59e0b',
    실내등유: '#ef4444',
    국내무연탄: '#8b5cf6',
  };

  return (
    <article className={styles.card}>
      <h2 className={styles.cardTitle}>월별 연료 배출량</h2>
      <div className={styles.cardContent}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={sortedData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              labelFormatter={(value) => `${value}월`}
              formatter={(value: number, name: string) => [
                `${value.toLocaleString()} tCO2eq`,
                name,
              ]}
            />
            {fuelTypes.map((fuel) => (
              <Area
                key={fuel}
                type="monotone"
                dataKey={fuel}
                stackId="1"
                stroke={fuelColors[fuel] || '#6b7280'}
                fill={fuelColors[fuel] || '#6b7280'}
              />
            ))}
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
};

export default MonthlyFuelEmissions;
