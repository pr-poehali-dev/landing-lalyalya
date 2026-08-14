export interface Donor {
  name: string;
  amount: number;
  role: string;
  bio: string;
}

export const GOAL_AMOUNT = 15000000;

export const DONORS: Donor[] = [];

export const TOTAL_RAISED = 10000;

export const formatAmount = (n: number) => `${n.toLocaleString('ru-RU')} ₽`;