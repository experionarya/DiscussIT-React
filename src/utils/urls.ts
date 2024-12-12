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

export const getAllPostsByCategory = (
  communityCategoryMappingId: number,
  pageNumber: number,
  pageSize: number,
  filterOption: number,
  sortOption: number
) =>
  `${apiBaseUrl}Thread?CommunityCategoryMappingID=${communityCategoryMappingId}
&pageNumber=${pageNumber}&pageSize=${pageSize}&filterOption=${filterOption}&sortOption=${sortOption}`;

export const getPreferenceList = `${apiBaseUrl}CommunityCategory/Get_PreferredCategory`;

export const globalSearch = (searchParam: string) =>
  `${apiBaseUrl}Thread/SearchThreadsByTitle?searchTerm=${searchParam}&pageNumber=1&pageSize=10`;

export const getBookMarks = (threadId: number) =>
  `${apiBaseUrl}Thread/${threadId}`;

export const getSavedThreadsId = (userId: string) =>
  `${apiBaseUrl}SavedPost/${userId}`;

export const getAllCategories = `${apiBaseUrl}CommunityCategory/all-categories`;

//getting all post based on filterBy
export const getAllPosts = (
  filterBy: string,
  pageNumber: number,
  pageSize: number,
  userID:string
) =>
  `${apiBaseUrl}Thread/Getall_threads?filterBy=${filterBy}&pageNumber=${pageNumber}&pageSize=${pageSize}&userId=${userID}`;

//getting all post based on category
export const getCategorywisePost = (
  communityCategoryId: number,
  pageNumber: number,
  pageSize: number
) =>
  `${apiBaseUrl}Thread/category_threads?CommunityCategoryID=${communityCategoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

export const saveAllCategories = `${apiBaseUrl}CommunityCategory/save_preference`;

export const getAnnouncementByCommunity = (communityId: number | undefined) =>
  `${apiBaseUrl}Notice/communityID?communityID=${communityId}`;

export const getNotifications = (userId: string) =>
  `${apiBaseUrl}Reply/unviewed?userId=${userId}&sortDirection=desc&pageNumber=1&pageSize=100`;

// mark single notification as read
export const singleNotificationHasRead = (replyId: number) =>
  `${apiBaseUrl}Reply/${replyId}/updateHasViewed`;

// mark all notification as read
export const markAllNotificationHasRead = `${apiBaseUrl}Reply/updateAllHasViewed`;

//save post
export const savePost = (
  communityMappingId: number,
  userId: number,
  communityID: number
) =>
  `${apiBaseUrl}Thread?communityMappingId=${communityMappingId}&userId=${userId}&communityID=${communityID}`;
// post details by thread id
export const getPostDetails = (threadId: number,userID:string) =>
  `${apiBaseUrl}Thread/${threadId}?userId=${userID}`;

// get the replies by thread
export const getPrimaryRepliesOfThread = (threadId: number) =>
  `${apiBaseUrl}Reply/PrimaryRepliesOfThread/${threadId}`;

//get the inner replies
export const getInnerReplies = (threadId: number, replyId: number) =>
  `${apiBaseUrl}Reply/GetRepliesByParentReplyId/${threadId}?parentReplyID=${replyId}`;

// update the vote
export const updateVote = (communityId: number) =>
  `${apiBaseUrl}ReplyVote/vote?communityID=${communityId}`;

// delete reply
export const deleteReply = (
  replyId: number,
  userId: string,
  communityId: number
) =>
  `${apiBaseUrl}Reply/${replyId}?modifierId=${userId}&communityID=${communityId}`;

// replace deleted comment with content
export const replaceDeletedContent = (replyId: number, userId: string) =>
  `${apiBaseUrl}Reply/${replyId}?modifierId=${userId}`;

// update thread vote
export const updateThreadVote = (communityId: number) =>
  `${apiBaseUrl}ThreadVote/vote?communityID=${communityId}`;

// tags details
export const getTrendingTagsDetails = (
  tagName: string,
  pageNumber: number,
  pageSize: number,
  filterOption: number,
  sortOption: number
) =>
  `${apiBaseUrl}Thread/displaySearchedThreads?searchTerm=${tagName}&pageNumber=${pageNumber}&pageSize=${pageSize}&filterOption=${filterOption}&sortOption=${sortOption}&searchType=1`;

//update post details
export const editPostDetails = (
  threadId: number,
  modifierId: number,
  communityID: number
) =>
  `${apiBaseUrl}Thread/${threadId}?ModifierId=${modifierId}&communityID=${communityID}`;

export const saveReply = (
  replyId: number,
  userId: string,
  communityId: number
) =>
  `${apiBaseUrl}Reply/${replyId}?creatorId=${userId}&communityID=${communityId}`;

// posting new child reply
export const postChildReply = (
  replyId: number,
  userId: string,
  communityId: number,
  parentReplyId: number
) =>
  `${apiBaseUrl}Reply/${replyId}?creatorId=${userId}&communityID=${communityId}&parentReplyId=${parentReplyId}`;

// editing an existing child reply
export const editChildReply = (
  replyId: number,
  userId: string,
  communityId: number
) =>
  `${apiBaseUrl}Reply/${replyId}?modifierId=${userId}&communityID=${communityId}`;

//get reply details for reply edit
export const getReplyDetails = (replyId: number) =>
  `${apiBaseUrl}Reply/${replyId}`;

export const getMyPosts = (
  userId: string,
  pageNumber: number,
  pageSize: number,
  filterOption: number,
  sortOption: number
) => `${apiBaseUrl}
Thread/MyThreads?userId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}&filterOption=${filterOption}&sortOption=${sortOption}`;

export const Bookmarks = `${apiBaseUrl}SavedPost/save`;

export const unSaveBookmark = (threadID: number|undefined, userID: string|undefined) =>
  `${apiBaseUrl}SavedPost/${userID}/${threadID}`;

export const markAsBestAnswer = (replyId: number, createdBy: string) =>
  `${apiBaseUrl}Reply/MarkAsBestAnswer/${replyId}?createdBy=${createdBy}`;

export const unMarkBestAnswer = (replyId: number, modifiedBy: string) =>
  `${apiBaseUrl}Reply/UnmarkBestAnswer/${replyId}?modifiedBy=${modifiedBy}`;

export const getBestAnswer = (replyId: number) =>
  `${apiBaseUrl}Reply/GetBestAnswer/${replyId}`;

export const logoutAccount = (userId: string) =>
  `${apiBaseUrl}Login/Logout?userId=${userId}`;

export const getAllAnnouncements = `${apiBaseUrl}Notice`;
