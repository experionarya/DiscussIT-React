import { produce } from "immer";
import { create } from "zustand";

import {
  fetchPostDetails,
  fetchPrimaryReplies,
  fetchReplyDetails,
} from "./apiStore";

export const usePostDetailsStore = create<any>()((set, get) => ({
  isPostDetailsLoading: false,
  postDetails: {},
  primaryReplies: {},
  ids: {},
  isRepliesLoading: false,
  innerReplies: [],
  nestedReplies: [],
  replyDetails: [],
  isBookmark: false,

  setIsBookmark: (value: boolean) => {
    set(
      produce((state: any) => {
        state.isBookmark = value;
      })
    );
  },


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
    
    set(
      produce((state: any) => {
        state.isBookmark = postDetails.isBookmark;
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

  getReplyDetails: async ({
    token,
    tokenType,
    replyId,
  }: {
    token: string;
    tokenType: string;
    replyId: number;
  }) => {
    const response = await fetchReplyDetails({ token, tokenType, replyId });
    console.log("responseeeeeeeeeeee", response);
    set(
      produce((state: any) => {
        state.replyDetails = {
          [response[0]?.replyID]: response[0]?.content,
        };
      })
    );
  },

  setReplyDetails: (value: any) => {
    set(
      produce((state: any) => {
        state.replyDetails = value;
      })
    );
  },
}));

