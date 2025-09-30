'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import { Company } from '@/types/Company';
import styles from '../dashboard-page.module.css';
import localStyles from './scope-chart.module.css';

interface ScopeChartProps {
  companiesData: Company[];
}

const ScopeChart = ({ companiesData }: ScopeChartProps) => {
  // 스코프별 데이터
  const scopeData = useMemo(() => {
    return companiesData.reduce(
      (acc, company) => {
        company.emissions.forEach((emission) => {
          const scopeKey = `scope${emission.scope}` as 'scope1' | 'scope2' | 'scope3';
          acc[scopeKey] += emission.emissions;
        });
        return acc;
      },
      { scope1: 0, scope2: 0, scope3: 0 }
    );
  }, [companiesData]);

  // 총합 계산
  const total = useMemo(() => {
    return scopeData.scope1 + scopeData.scope2 + scopeData.scope3;
  }, [scopeData]);

  // 차트 데이터 변환
  const chartData = useMemo(() => {
    return [
      {
        name: '스코프 1',
        value: scopeData.scope1,
        percentage: total > 0 ? ((scopeData.scope1 / total) * 100).toFixed(1) : '0',
      },
      {
        name: '스코프 2',
        value: scopeData.scope2,
        percentage: total > 0 ? ((scopeData.scope2 / total) * 100).toFixed(1) : '0',
      },
      {
        name: '스코프 3',
        value: scopeData.scope3,
        percentage: total > 0 ? ((scopeData.scope3 / total) * 100).toFixed(1) : '0',
      },
    ];
  }, [scopeData, total]);

  const COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6'];

  return (
    <article className={styles.card}>
      <h2 className={styles.cardTitle}>스코프</h2>
      <div className={styles.cardContent}>
        <div className={localStyles.scopeChartContainer}>
          <ResponsiveContainer
            width="100%"
            height={250}
            className={localStyles.responsiveContainer}
          >
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className={localStyles.scopeLegend}>
            {chartData.map((item, index) => (
              <div key={index} className={localStyles.legendItem}>
                <div
                  className={localStyles.legendColor}
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className={localStyles.legendText}>
                  {item.name}: {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ScopeChart;
