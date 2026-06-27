export interface Goal {
  id: string;
  name: string;
  total: number;
  remaining: number;
  status: 'active' | 'completed';
  createdAt: number;
}

export interface BeadData {
  id: string;
  x: number;
  y: number;
}
