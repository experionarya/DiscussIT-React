import { produce } from "immer";
import { create } from "zustand";

import { fetchPostDetails, fetchPrimaryReplies } from "./apiStore";

export const usePostDetailsStore = create<any>()((set, get) => ({
  isPostDetailsLoading: false,
  postDetails: {},
  primaryReplies: {},
  ids: {},
  isRepliesLoading: false,
  innerReplies: [],
  nestedReplies: [],

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

    set(
      produce((state: any) => {
        state.isPostDetailsLoading = false;
      })
    );
  },

  setIds: (threadId: number, replyId: number) => {
    set(
      produce((state: any) => {
        state.ids = { threadId: threadId, replyId: replyId };
      })
    );
  },

  setNestedReply: (innerReplies: any) => {
    set(
      produce((state: any) => {
        state.nestedReplies = [...innerReplies];
      })
    );
  },
}));
