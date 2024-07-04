export const apiBaseUrl = "https://discussit-api-dev.experionglobal.dev/api/";

//get the community list
export const getCommunityList = `${apiBaseUrl}Community`;

//get the microsoft info
export const microsoftInfo = "https://graph.microsoft.com/beta/me";

//external login
export const externalLoginDetails = `${apiBaseUrl}Login/ExternalLogin`;

//leaderboard api
export const getTopLeaders = `${apiBaseUrl}users/TopUsersByScore/15`;

//
export const getPrimaryRepliesOfThread = `${apiBaseUrl}Reply/PrimaryRepliesOfThread/11?page=1&pageSize=6`;
