'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import { Company } from '@/types/Company';
import styles from '../dashboard-page.module.css';
import localStyles from './goal-achievement.module.css';

interface MonthlyGoalData {
  month: string;
  actualEmissions: number;
  quota: number;
  achievementRate: number;
}

interface GoalAchievementProps {
  companiesData: Company[];
  selectedCompany: string | null;
}

const GoalAchievement = ({ companiesData, selectedCompany }: GoalAchievementProps) => {
  const monthlyGoalData = companiesData.reduce((acc, company) => {
    // 월별로 그룹
    const monthlyMap = new Map<string, number>();

    company.emissions.forEach((emission) => {
      const existing = monthlyMap.get(emission.yearMonth) || 0;
      monthlyMap.set(emission.yearMonth, existing + emission.emissions);
    });

    // 합계 계산
    monthlyMap.forEach((emissions, month) => {
      const existing = acc.find((item) => item.month === month);
      if (existing) {
        existing.actualEmissions += emissions;
        existing.quota += company.monthlyQuota;
      } else {
        acc.push({
          month,
          actualEmissions: emissions,
          quota: company.monthlyQuota,
          achievementRate: 0,
        });
      }
    });

    return acc;
  }, [] as MonthlyGoalData[]);

  // 달성률 계산 및 정렬
  const sortedData = monthlyGoalData
    .map((item) => ({
      ...item,
      achievementRate: item.quota > 0 ? (item.actualEmissions / item.quota) * 100 : 0,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  const getTitle = () => {
    if (selectedCompany) {
      const company = companiesData.find((c) => c.id === selectedCompany);
      return `목표 달성 현황 - ${company?.name}`;
    }
    return '목표 달성 현황 - 기업전체';
  };

  return (
    <article className={styles.card}>
      <div className={localStyles.headerWrapper}>
        {/* 타이틀 */}
        <h2 className={styles.cardTitle}>{getTitle()}</h2>
        {/* 현재 달성률  */}
        <div className={localStyles.achievementSummary}>
          {sortedData.length > 0 && (
            <div className={localStyles.currentAchievement}>
              <span>최근 달성률: </span>
              <span
                className={
                  sortedData[sortedData.length - 1].achievementRate <= 100
                    ? localStyles.achievementGood
                    : localStyles.achievementBad
                }
              >
                {sortedData[sortedData.length - 1].achievementRate.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.cardContent}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={sortedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.slice(5)}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              labelFormatter={(value) => `${value}월`}
              formatter={(value: number, name: string) => {
                if (name === 'achievementRate') return [`${value.toFixed(1)}%`, '달성률'];
                if (name === 'actualEmissions')
                  return [`${value.toLocaleString()} tCO2eq`, '배출량'];
                if (name === 'quota') return [`${value.toLocaleString()} tCO2eq`, '할당량'];
                return [value, name];
              }}
            />

            <Line
              type="monotone"
              dataKey="quota"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="할당량"
            />
            <Line
              type="monotone"
              dataKey="actualEmissions"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              name="실제 배출량"
            />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
};

export default GoalAchievement;
