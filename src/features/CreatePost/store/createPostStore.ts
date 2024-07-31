import { create } from "zustand";
import { produce } from "immer";

export const useCreatePostStore = create<any>()((set, get) => ({
  postDetails: null,

  setPostDetails: (key: string, value: any) => {
    set(
      produce((state: any) => {
        state.postDetails = { ...get().postDetails, [key]: value };
      })
    );
  },
}));
