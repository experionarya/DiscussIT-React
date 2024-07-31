export const apiBaseUrl = "https://discussit-api-dev.experionglobal.dev/api/";

//get the community list
export const getCommunityList = `${apiBaseUrl}Community`;

//get the microsoft info
export const microsoftInfo = "https://graph.microsoft.com/beta/me";

//external login
export const externalLoginDetails = `${apiBaseUrl}Login/ExternalLogin`;

//leaderboard api
export const getTopLeaders = `${apiBaseUrl}users/TopUsersByScore/15`;

//user details
export const getUserDetails = (userId: string) =>
  `${apiBaseUrl}users/${userId}`;

// get the trending tags
export const getTrendingTags = `${apiBaseUrl}Tag?true`;

// get the top users
export const getTopUsers = `${apiBaseUrl}users/TopUsersByScore/15`;

// get the post by category
export const getPostByCategory = (
  communityId: number,
  communityCategoryMappingId: number
) =>
  `${apiBaseUrl}Thread/top-threads?CommunityID=${communityId}&CommunityCategoryMappingID=${communityCategoryMappingId}&sortBy=latest&topCount=100`;

// get ctaegory by community
export const getCategoryByCommunity = (communityId: number | undefined) =>
  `${apiBaseUrl}CommunityCategoryMapping/InCommunity/${communityId}`;

export const getAllPostsByCategory = (communityCategoryMappingId: number) =>
  `${apiBaseUrl}Thread?CommunityCategoryMappingID=${communityCategoryMappingId}
&pageNumber=1&pageSize=100&filterOption=0&sortOption=2`;

export const getPreferenceList = `${apiBaseUrl}CommunityCategory/Get_PreferredCategory`;

export const getBookMarks = (threadId: number) =>
  `${apiBaseUrl}Thread/${threadId}`;

export const getSavedThreadsId = (userId: string) =>
  `${apiBaseUrl}SavedPost/${userId}`;

export const getAllCategories = `${apiBaseUrl}CommunityCategory/all-categories`;

export const saveAllCategories= `${apiBaseUrl}CommunityCategory/save_preference`;

export const getAnnouncementByCommunity = (communityId: number | undefined) =>
  `${apiBaseUrl}Notice/communityID?communityID=${communityId}`;

export const getNotifications = (userId: string) =>
  `${apiBaseUrl}Reply/unviewed?userId=${userId}&sortDirection=desc&pageNumber=1&pageSize=100`;

// mark single notification as read
export const singleNotificationHasRead = (replyId: number) =>
  `${apiBaseUrl}Reply/${replyId}/updateHasViewed`;

// mark all notification as read
export const markAllNotificationHasRead = `${apiBaseUrl}Reply/updateAllHasViewed`;

// post details by thread id
export const getPostDetails = (threadId: number) =>
  `${apiBaseUrl}Thread/${threadId}`;

// get the replies by thread
export const getPrimaryRepliesOfThread = (threadId: number) =>
  `${apiBaseUrl}Reply/PrimaryRepliesOfThread/${threadId}`;
