export type CategoryType = {
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

export type AllCategoryType = {
  communityCategoryID: number;
  communityCategoryName: string;
  communityID: number;
};
