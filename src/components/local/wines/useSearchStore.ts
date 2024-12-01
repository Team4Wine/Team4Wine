import { create } from "zustand";
import { WineDataBrief } from "./interfaces";
import fetchData, { FetchDataOptions } from "@/utils/fetchData";

interface SearchStore {
  limit: number;
  totalCount: number;
  nextCursor: null | number;
  searchedWines: WineDataBrief[];
  fetchSearchedWines: any;
  isLoading: boolean;
  error: null | any;
}

const useSearchStore = create<SearchStore>((set) => ({
  limit: 5,
  totalCount: 0,
  nextCursor: 1,
  searchedWines: [],
  isLoading: false,
  error: null,

  fetchSearchedWines: async (
    limit: number,
    nextCursor: null | number,
    searchedWines: WineDataBrief[]
  ) => {
    console.log("fetch 시작 (search)");
    set({ isLoading: true, error: null });

    const query =
      nextCursor == 1 ? { limit: limit } : { limit: limit, cursor: nextCursor };

    try {
      const data: FetchDataOptions = {
        url: "https://winereview-api.vercel.app/10-4/wines",
        query: query,
        method: "GET",
        body: null,
        headers: {},
      };
      const result = await fetchData(data);
      set({ searchedWines: searchedWines.concat(result.list) });
      set({ totalCount: result.totalCount });
      set({ nextCursor: result.nextCursor });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
    console.log("fetch 종료");
  },
}));

export default useSearchStore;
