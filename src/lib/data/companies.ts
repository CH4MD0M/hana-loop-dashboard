import { Company } from '@/types/Company';

export const companies: Company[] = [
  {
    id: 'c1',
    name: 'Hana Green Energy',
    country: 'KR',
    emissions: [
      { yearMonth: '2024-01', emissions: 85 },
      { yearMonth: '2024-02', emissions: 78 },
      { yearMonth: '2024-03', emissions: 82 },
      { yearMonth: '2024-04', emissions: 76 },
      { yearMonth: '2024-05', emissions: 71 },
    ],
  },
  {
    id: 'c2',
    name: 'Hana Tech Solutions',
    country: 'US',
    emissions: [
      { yearMonth: '2024-01', emissions: 120 },
      { yearMonth: '2024-02', emissions: 115 },
      { yearMonth: '2024-03', emissions: 108 },
      { yearMonth: '2024-04', emissions: 102 },
      { yearMonth: '2024-05', emissions: 95 },
    ],
  },
  {
    id: 'c3',
    name: 'Hana Manufacturing',
    country: 'JP',
    emissions: [
      { yearMonth: '2024-01', emissions: 200 },
      { yearMonth: '2024-02', emissions: 195 },
      { yearMonth: '2024-03', emissions: 188 },
      { yearMonth: '2024-04', emissions: 182 },
      { yearMonth: '2024-05', emissions: 176 },
    ],
  },
  {
    id: 'c4',
    name: 'Hana Logistics Europe',
    country: 'DE',
    emissions: [
      { yearMonth: '2024-01', emissions: 150 },
      { yearMonth: '2024-02', emissions: 145 },
      { yearMonth: '2024-03', emissions: 140 },
      { yearMonth: '2024-04', emissions: 138 },
      { yearMonth: '2024-05', emissions: 132 },
    ],
  },
  {
    id: 'c5',
    name: 'Hana Resources',
    country: 'AU',
    emissions: [
      { yearMonth: '2024-01', emissions: 300 },
      { yearMonth: '2024-02', emissions: 285 },
      { yearMonth: '2024-03', emissions: 275 },
      { yearMonth: '2024-04', emissions: 270 },
      { yearMonth: '2024-05', emissions: 260 },
    ],
  },
];
