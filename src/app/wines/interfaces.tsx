import { ChangeEvent, FormEvent, FormEventHandler, KeyboardEvent } from "react";

export interface SimpleWineData {
  id: number;
  name: string;
  image: string;
  avgRating: number;
}

export interface WineData {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: ReviewData;
}

export interface ReviewData {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: UserData;
}

export interface UserData {
  id: number;
  nickname: string;
  image: null;
}

export interface SearchProps {
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const WineType = {
  Red: "red",
  White: "white",
  Sparkling: "sparkling",
} as const;

export interface FilterState {
  type: typeof WineType | null;
  minPrice: number;
  maxPrice: number;
  rating: boolean[];
}

export interface FilterProps {
  value?: FilterState;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLButtonElement>) => void;
}
