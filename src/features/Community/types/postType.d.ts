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

export type ThreadType = {
  categoryName: null | string;
  communityName: null | string;
  communityID: number;
  content: string;
  createdAt: string;
  createdBy: string;
  createdByUser: string;
  downVoteCount: number;
  isAnswered: boolean;
  isBookmark: boolean;
  isEdited: null;
  modifiedAt: string;
  modifiedBy: string;
  modifiedByUser: string;
  replyCount: number;
  tagNames: Array<string>;
  threadID: number;
  threadOwnerEmail: null;
  threadStatusName: string;
  title: string;
  upVoteCount: number;
};

export type AllPostsType = {
  categoryDescription: string;
  categoryName: string;
  threads: Array<ThreadType>;
};
