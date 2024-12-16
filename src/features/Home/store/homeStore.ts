import { produce } from "immer";
import { create } from "zustand";

import {
  externalLogin,
  fetchMicrosoftInformation,
  fetchTopUsers,
  fetchTrendingTags,
  fetchUserDetails,
  fetchBookMarks,
} from "./apiStore";

import {
  getDecodedToken,
  getParsedToken,
  getUserIdFromToken,
  setParsedToken,
} from "src/utils/authenticationHelper/tokenHandler";

import { BookMark } from "../types/bookMarkDataType";
import { TrendingTagType } from "../types/trendingTags";

export const useHomeStore = create<any>()((set, get) => ({
  home: {
    isLoading: false,
  },
  userDetails: {},
  trendingTags: [],
  topUsers: [],
  categoryList: [],
  checkedItems: {},
  bookMarks: [],
  allPosts: [],
  filterByValue: "newest",
  communityId: -1,

  getHomeInfo: async ({
    token,
    tokenType,
    id_token,
    savedPosts,
  }: Partial<{
    token: string;
    tokenType: string;
    id_token: string;
    savedPosts: Array<any>;
  }>) => {
    set(
      produce((state: any) => {
        state.home.isLoading = true;
      })
    );

    const microsoftResp = await fetchMicrosoftInformation({
      token: token,
      tokenType: tokenType,
    });

    const data = {
      Provider: "microsoft",
      expiration: 0,
      Token: id_token,
      userDetails: microsoftResp,
      username: "",
    };

    const externalLoginResp = await externalLogin(data);

    if (externalLoginResp) {
      setParsedToken(externalLoginResp?.token);
      getDecodedToken(externalLoginResp?.token);
    }

    const userId = getUserIdFromToken();

    const userDetails = await fetchUserDetails({
      token: getParsedToken(),
      tokenType: tokenType,
      userId: userId,
    });

    set(
      produce((state: any) => {
        state.userDetails = { ...userDetails };
      })
    );

    const trendingTagsResp = await fetchTrendingTags({
      token: getParsedToken(),
      tokenType: tokenType,
    });

    set(
      produce((state: any) => {
        const temp = trendingTagsResp?.filter(
          (item: TrendingTagType) => item?.tagCount >= 3
        );
        state.trendingTags = temp && temp.length ? [...temp] : [];
      })
    );

    const topUsersResp = await fetchTopUsers({
      token: getParsedToken(),
      tokenType: tokenType,
    });

    //calling the individual post apis
    savedPosts?.forEach((post) => {
      const parsedToken = getParsedToken();
      if (parsedToken && tokenType && post?.threadID)
        get().getBookMarkedData({
          tokenType: tokenType,
          threadId: post?.threadID,
        });
    });

    set(
      produce((state: any) => {
        state.topUsers =
          topUsersResp && topUsersResp.length ? [...topUsersResp] : [];
      })
    );
  },

  getBookMarkedData: async ({
    tokenType,
    threadId,
  }: Partial<{
    tokenType: string;
    threadId: number;
  }>) => {
    const data = await fetchBookMarks({
      token: getParsedToken(),
      tokenType: tokenType,
      threadId: threadId,
    });
    let tempArray = [];
    tempArray.push(data);

    set(
      produce((state: any) => {
        const temp = [...state.bookMarks, ...tempArray]
        const uniqueArray = temp.filter((o, index, arr) =>
          arr.findIndex(item => JSON.stringify(item) === JSON.stringify(o)) === index
      );
        state.bookMarks = [...uniqueArray]
      })
    );
  },

  setCheckedItems: (event: any) => {
    const { name, checked } = event.target;
    set(
      produce((state: any) => {
        state.checkedItems = { ...state.checkedItems, [name]: checked };
      })
    );
  },

  setCheckedItemsFromApi: (value: any) => {
    set(
      produce((state: any) => {
        state.checkedItems = { ...value };
      })
    );
  },

  clearBookMarkData: () => {
    set(
      produce((state: any) => {
        state.bookMarks = [];
      })
    );
  },

  setAllPost: (data: Array<BookMark>) => {
    set(
      produce((state: any) => {
        state.allPosts = data && data.length ? [...data] : [];
      })
    );
  },

  addToCategoryList: (data: Record<any, any>) => {
    const trueKeys = Object.entries(data)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => key);
    set(
      produce((state: any) => {
        state.categoryList = [...trueKeys];
      })
    );
  },
  setFilterByValue: (value: string) => {
    set((state: any) => ({ filterByValue: value }));
  },
  setCommunityId: (value: number) => {
    set((state: any) => ({
      communityId: value,
    }));
  },
}));
