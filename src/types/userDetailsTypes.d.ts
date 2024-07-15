export type UserDetailsType = {
  departmentName: string;
  designationName: string;
  email: string;
  name: string;
  roleName: string;
  score: number;
  userID: string;
};

export type UserDetailsParamsType = {
  token: string | null;
  tokenType: string | undefined;
  userId: string;
};
