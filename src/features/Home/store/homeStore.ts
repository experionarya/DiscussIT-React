import { produce } from "immer";
import { create } from "zustand";

import {
  externalLogin,
  fetchMicrosoftInformation,
  fetchTopUsers,
  fetchTrendingTags,
  fetchUserDetails,
} from "./apiStore";

import {
  getDecodedToken,
  getParsedToken,
  getUserIdFromToken,
  setParsedToken,
} from "src/utils/authenticationHelper/tokenHandler";

export const useHomeStore = create<any>()((set, get) => ({
  home: {
    isLoading: false,
  },
  userDetails: {},
  trendingTags: [],
  topUsers: [],

  getHomeInfo: async ({
    token,
    tokenType,
    id_token,
  }: Partial<{ token: string; tokenType: string; id_token: string }>) => {
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
        state.trendingTags = [...trendingTagsResp];
      })
    );

    const topUsersResp = await fetchTopUsers({
      token: getParsedToken(),
      tokenType: tokenType,
    });

    set(
      produce((state: any) => {
        state.topUsers = [...topUsersResp];
      })
    );

    console.log("userDetails", userDetails);
  },
}));
