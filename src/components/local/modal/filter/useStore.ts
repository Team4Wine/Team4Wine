import { create} from 'zustand';

type Filter = {
  wineTypes: string;
  price: number;
  rating: number;
  setWineTypes: (wineTypes: string) => void;
  setPrice: (price: number) => void;
  setRating: (rating: number) => void;
};

const useFilterStore = create<Filter>((set) => ({
  wineTypes: "",
  price: 0,
  rating: 0,
  setWineTypes: (wineTypes: string) => set({ wineTypes }),
  setPrice: (price: number) => set({ price }),
  setRating: (rating: number) => set({ rating }),
}));

export default useFilterStore;
