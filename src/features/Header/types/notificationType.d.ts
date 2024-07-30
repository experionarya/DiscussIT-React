export type ReplyType = {
  categoryName: string;
  childReplyContent: string;
  childReplyCreatedAt: string;
  childReplyID: number;
  childReplyUserName: string;
  communityName: string;
  parentReplyContent: string;
  parentReplyID: number;
  parentReplyUserName: string;
  threadContent: string;
};

export type NotificationType = {
  replies: Array<ReplyType>;
  totalCount: number;
};
