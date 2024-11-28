import { create } from "zustand";
import fetchData from "../../utils/fetchData";
import { FetchDataOptions } from "../../utils/fetchData";
// import { URL_DONATIONS } from '@/shared/constant/url';

interface SearchStore {
  totalCount: number;
  nextCursor: number;
  searchedWines: any;
  fetchSearchedWines: any;
  isLoading: boolean;
  error: null | any;
}

const useSearchStore = create<SearchStore>((set) => ({
  totalCount: 0,
  nextCursor: 0,
  searchedWines: [],
  isLoading: false,
  error: null,

  fetchSearchedWines: async () => {
    console.log("fetch 시작 (search)");
    set({ isLoading: true, error: null });
    try {
      const data: FetchDataOptions = {
        url: "https://winereview-api.vercel.app/10-4/wines",
        query: { limit: 10 },
        method: "GET",
        body: null,
        headers: {},
      };
      const result = await fetchData(data);
      console.log("fetchSearched 함수에서, result: ", result);
      set({ searchedWines: result.list });
      set({ totalCount: result.totalCount });
      set({ nextCursor: result.nextCursor });
    } catch (error) {
      console.log("fetchSearched 함수에서, catch: ", error);
      set({ error: error });
    } finally {
      console.log("fetchSearched 함수에서, finally");
      set({ isLoading: false });
    }
    console.log("fetch 종료");
  },
}));

export default useSearchStore;
