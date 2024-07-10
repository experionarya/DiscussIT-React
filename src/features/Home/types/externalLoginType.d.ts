export type ExternalLoginType = {
  Provider: string;
  expiration: number;
  Token: string | null | undefined;
  userDetails: any;
  username: string;
};
