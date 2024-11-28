import { create } from "zustand";
import fetchData from "../../utils/fetchData";
import { FetchDataOptions } from "../../utils/fetchData";
// import { URL_DONATIONS } from '@/shared/constant/url';

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
    console.log("fetch 시작 (recommended)");
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
      console.log("fetchRecommended 함수에서, result: ", result);
      set({ recommendedWines: result });
    } catch (error) {
      console.log("fetchRecommended 함수에서, catch: ", error);
      set({ error: error });
    } finally {
      console.log("fetchRecommended 함수에서, finally");
      set({ isLoading: false });
    }
    console.log("fetch 종료");
  },
}));

export default useRecommendStore;
