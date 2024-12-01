import { UserData } from "../interfaces";

// /wines/{id}
export interface WineDataFull {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: ReviewDataFull | null;
  userId: number;
  reviews: [];
  avgRatings: {};
}

// /wines/{id}
export interface ReviewDataFull {
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
  isLiked: boolean;
}
