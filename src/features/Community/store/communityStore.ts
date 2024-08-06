import { produce } from "immer";
import { create } from "zustand";

import { fetchCategoryByCommunity, fetchCommunityList } from "./apiStore";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

export const useCommunityStore = create<any>()((set, get) => ({
  category: {},
  isLoading: false,
  communityList: [],
  categoryByCommunity: [],

  getCommunityInfo: async ({
    token,
    tokenType,
  }: Partial<{ token: string; tokenType: string }>) => {
    set(
      produce((state: any) => {
        state.isLoading = true;
      })
    );

    const communityList = await fetchCommunityList({
      token: getParsedToken(),
      tokenType,
    });

    set(
      produce((state: any) => {
        state.communityList = communityList?.map((item: any, index: number) => {
          return {
            id: item?.communityID,
            name: item?.communityName,
            isOpen: index === 0 ? true : false,
            content: null,
          };
        });
      })
    );

    const categoryList = await fetchCategoryByCommunity({
      token: token,
      tokenType: tokenType,
      communityId: communityList[0].communityID,
    });

    set(
      produce((state: any) => {
        state.categoryByCommunity = [...categoryList];
        state.communityList = get().communityList?.map((item: any) => {
          if (item?.id === categoryList[0]?.communityID) {
            return {
              ...item,
              isOpen: true,
              content: categoryList?.sort(
                (a: { threadCount: number }, b: { threadCount: number }) =>
                  b.threadCount - a.threadCount
              ),
            };
          }
          return item;
        });
        state.category = {
          communityId: get().communityList[0].id,
          categoryId: categoryList?.[0].communityCategoryMappingID,
          categoryName: categoryList?.[0].communityCategoryName,
        };
      })
    );
  },

  setCategoryByCommunity: (categoryList: any, id: number) => {
    set(
      produce((state: any) => {
        state.categoryByCommunity = [...categoryList];
        state.category = {
          communityId: id,
          categoryId: categoryList?.[0].communityCategoryMappingID,
          categoryName: categoryList?.[0].communityCategoryName,
        };
      })
    );
  },

  setCategory: (
    communityId: number,
    categoryId: number,
    categoryName: string
  ) => {
    set(
      produce((state: any) => {
        state.category = {
          communityId: communityId,
          categoryId: categoryId,
          categoryName: categoryName,
        };
      })
    );
  },
}));
