import { type GhgEmission } from './GhgEmission';

export interface Company {
  id: string;
  name: string;
  country: string;
  emissions: GhgEmission[];
}
