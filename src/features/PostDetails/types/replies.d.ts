export type ReplyType = {
  replyID: number;
  threadID: number;
  parentReplyID: number | null;
  content: string;
  upvoteCount: number;
  downvoteCount: number;
  isDeleted: boolean;
  hasViewed: boolean;
  createdBy: string;
  createdUserName: string;
  createdAt: string;
  modifiedBy: string | null;
  modifiedAt: string | null;
  threadOwnerEmail: string | null;
  nestedReplies: ReplyType[] | null;
  parentReplyUserEmail: string | null;
  childReplyCount: number;
  children?: ReplyType[];
};

export type SingleReplyType = Omit<ReplyType, "children">;
