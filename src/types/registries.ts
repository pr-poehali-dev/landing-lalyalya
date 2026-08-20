export interface EntrepreneurItem {
  id: number;
  name: string;
  title: string | null;
  photo: string | null;
  bio: string;
  sort_order: number;
}

export interface DonorItem {
  id: number;
  name: string;
  amount: number;
  role: string;
  bio: string;
  photo: string | null;
  sort_order: number;
}

export interface PartnerItem {
  id: number;
  name: string;
  logo: string;
  sort_order: number;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
}
