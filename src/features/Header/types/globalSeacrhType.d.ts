type threadType = {
  threadID: number;
  title: string;
  content: string;
  createdBy: string;
  createdByUser: string;
  createdAt: string;
  modifiedBy: string | null;
  modifiedByUser: string | null;
  modifiedAt: string | null;
  threadStatusName: string;
  isAnswered: boolean;
  upVoteCount: number;
  downVoteCount: number;
  isEdited: boolean | null;
  replyCount: 0;
  tagNames: Array<string>;
  threadOwnerEmail: string | null;
  communityName: string | null;
  categoryName: string | null;
};
type searchList = {
  isSearchTag: boolean;
  searchThreadDtoList: Array<threadType>;
  searchThreadDtoListLength: number;
};
type ListItemType = {
  title: string;
  id: number;
};

export { searchList, threadType, ListItemType };
