import { produce } from "immer";
import { create } from "zustand";

import { fetchPostDetails, fetchPrimaryReplies } from "./apiStore";

export const usePostDetailsStore = create<any>()((set, get) => ({
  isPostDetailsLoading: false,
  postDetails: {},
  primaryReplies: {},

  getPostDetailsInfo: async ({
    token,
    tokenType,
    threadId,
  }: Partial<{ token: string; tokenType: string; threadId: number }>) => {
    set(
      produce((state: any) => {
        state.isPostDetailsLoading = true;
      })
    );

    const postDetails = await fetchPostDetails({
      token,
      tokenType,
      threadId: threadId,
    });

    set(
      produce((state: any) => {
        state.postDetails = { ...postDetails };
      })
    );

    const primaryReplies = await fetchPrimaryReplies({
      token,
      tokenType,
      threadId: threadId,
    });

    set(
      produce((state: any) => {
        state.primaryReplies = primaryReplies;
      })
    );
  },
}));
