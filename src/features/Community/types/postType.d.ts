export type PostType = {
  categoryName: string | null;
  communityName: string | null;
  content: string;
  createdAt: string;
  createdBy: string;
  createdByUser: string;
  downVoteCount: number;
  isAnswered: boolean;
  isEdited: null;
  modifiedAt: null | string;
  modifiedBy: null | string;
  modifiedByUser: null | string;
  replyCount: number;
  tagNames: Array<string>;
  threadID: number;
  threadOwnerEmail: null | string;
  threadStatusName: string;
  title: string;
  upVoteCount: number;
};
