export interface GhgEmission {
  yearMonth: string;
  source: '전력' | '도시가스' | '경유' | '프로판' | '실내등유' | '국내무연탄';
  scope: 1 | 2 | 3;
  emissions: number;
}
