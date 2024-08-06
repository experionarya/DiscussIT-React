import { ThreadType } from "src/features/Community/types/postType";

export type TrendingTagDetailsType = {
  searchThreadDtoListLength: number;
  searchThreadDtoList: Array<ThreadType>;
};
