import { create } from "zustand";
import { produce } from "immer";

import { format } from "../utils/postConstants";

import { fetchBookMarks } from "src/features/Home/store/apiStore";

import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";


export const useCreatePostStore = create<any>()((set, get) => ({
  postDetails: null,
  setPostDetails: (key: string, value: any) => {
    set(
      produce((state: any) => {
        state.postDetails = { ...get().postDetails, [key]: value };
      })
    );
  },  
  showWarning: (postDetails: any, param: string) => {
    if (param === "title") {
      if (
        postDetails?.title?.length > 100 ||
        postDetails?.title?.length < 5 ||
        postDetails?.title?.charAt(0) === "#"
      ) {
        return true;
      }
    } else if (param === "content") {
      if (
        postDetails?.content?.length < 20
      ) {
        return true;
      }
    } else if (param === "tagNames") {
      const value = postDetails?.tagNames?.map(
        (item: any, index: number) => item?.label
      );
      const valueString = value?.toString();
      if (
        valueString?.match(format) ||
        postDetails?.tagNames?.length === undefined
      ) {
        return true;
      }
    }
  },
  getPostDetails: async (
    id: number,
    userMode: string,
    tokenType: string,
    tagOptions: Array<{ value: number; label: string }>
  ) => {
    if (userMode === "Edit" && tokenType) {
      set(
        produce((state: any) => {
          state.isEditing = true;
        })
      );
      const response = await fetchBookMarks({
        token: getParsedToken(),
        tokenType: tokenType,
        threadId: id,
      });
      const tagArray = tagOptions?.filter((item) => {
        if (item?.label.includes(response?.tagNames)) return item;
      });

      set(
        produce((state: any) => {
          state.postDetails = { ...response };
          state.postDetails.tagNames = tagArray;
          state.isEditing = false;
        })
      );
    }
  },
  clearPostDetails() {
    set(
      produce((state: any) => {
        state.postDetails = undefined;
      })
    );
  }
}));
