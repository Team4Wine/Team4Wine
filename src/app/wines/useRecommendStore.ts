import { create } from "zustand";
import fetchData from "../../utils/fetchData";
import { FetchDataOptions } from "../../utils/fetchData";

interface RecommendStore {
  recommendedWines: any;
  fetchRecommendedWines: any;
  isLoading: boolean;
  error: null | any;
}

const useRecommendStore = create<RecommendStore>((set) => ({
  recommendedWines: [],
  isLoading: false,
  error: null,

  fetchRecommendedWines: async () => {
    set({ isLoading: true, error: null });
    try {
      const data: FetchDataOptions = {
        url: "https://winereview-api.vercel.app/10-4/wines/recommended",
        query: { limit: 10 },
        method: "GET",
        body: null,
        headers: {},
      };
      const result = await fetchData(data);
      set({ recommendedWines: result });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useRecommendStore;
