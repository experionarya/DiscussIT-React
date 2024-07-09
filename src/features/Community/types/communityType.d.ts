export type CommunityType = {
  categoryCount: number;
  communityID: number;
  communityName: string;
  communityStatusName: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string | null;
  modifiedBy: string | null;
  postCount: number;
  topCategories: Array<string>;
};
