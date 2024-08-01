import { create } from "zustand";
import { produce } from "immer";

import { format } from "../utils/postConstants";

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
    if (param === "Title") {
      if (
        postDetails?.Title?.length > 100 ||
        postDetails?.Title?.length < 5 ||
        postDetails?.Title?.charAt(0) === "#"
      ) {
        return true;
      }
    } else if (param === "Description") {
      if (
        postDetails?.Description?.length > 1000 ||
        postDetails?.Description?.length < 20 ||
        postDetails?.Description?.charAt(0) === "#"
      ) {
        return true;
      }
    } else if (param === "TagStatus") {
      const value = postDetails?.TagStatus?.map(
        (item: any, index: number) => item?.label
      );
      const valueString = value?.toString();
      if (
        valueString?.match(format) ||
        postDetails?.TagStatus?.length === undefined
      ) {
        return true;
      }
    }
  },
}));
