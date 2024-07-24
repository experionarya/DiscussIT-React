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

export type ContentType = {
  communityCategoryID: number;
  communityCategoryMappingID: number;
  communityCategoryName: string;
  communityID: number;
  createdAt: string;
  createdBy: string;
  description: string;
  isDeleted: boolean;
  modifiedAt: null | string;
  modifiedBy: null | string;
  threadCount: number;
};

export type DisclosureType = {
  id: number;
  isOpen: boolean;
  name: string;
  content: Array<ContentType>;
};
