import React, { ReactElement, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  ArrowBigUp,
  MessageSquare,
  ArrowBigDown,
  Bookmark,
} from "lucide-react";

import {
  createMarkup,
  getHtmlTextLength,
  trimHTMLContent,
} from "src/utils/common";
import { BookMark } from "src/features/Home/types/bookMarkDataType";
import { Avatar } from "src/components";
import { useGetCommunityList } from "src/features/Community/api/useGetCommunityList";
import { useUpdateThreadVote } from "src/features/PostDetails/api/useUpdateThreadVote";
import { getUserIdFromToken } from "src/utils/authenticationHelper/tokenHandler";
import { useQueryClient } from "react-query";
import { useBookmarks } from "src/features/PostDetails/api/useBookmarks";
import { useUnSaveBookmark } from "src/features/PostDetails/api/useUnsaveBookmark";
import { fetchPostDetails } from "src/features/PostDetails/store/apiStore";



export function PostItem({ item }: { item: BookMark }): ReactElement {
  const { data: communityList } = useGetCommunityList();
  const navigate = useNavigate();
  const { mutate: updateVoteByThread } = useUpdateThreadVote();
  const [thread, setThread] = useState(item);
  const queryClient = useQueryClient();
  const userID = getUserIdFromToken();
  const { mutate: unSaveBookmark } = useUnSaveBookmark();
  const { mutate: saveBookmark } = useBookmarks();

  useEffect(() => {
    if (item) {
      setThread(item);
    }
  }, [item]);
  

  function gotoPost(id: number) {
    navigate(`/community/category-posts/replies?threadId=${id}`, {
      state: { from: window.location.pathname },
    });
  }

  function getCommunityId() {
    const community = communityList?.find(
      (community) => community.communityName === item.communityName
    );
    if (community) {
      localStorage.setItem("communityId", community.communityID.toString());
    }
  }

  function handleItemClick(event: React.MouseEvent, threadID: number) {
    if ((event.target as HTMLElement).closest("a")) {
      return;
    }
    gotoPost(threadID);
  }

  const handleUpvote = () => {
    const communityId = parseInt(localStorage.getItem("communityId") || "");
    const prevUpVoteCount = thread?.upVoteCount || 0;
    const prevDownVoteCount = thread?.downVoteCount || 0;
  
    setThread((prevThread) => {
      const hasUpvoted = prevThread?.isUpVoted === true; 
      const hasDownvoted = prevThread?.isUpVoted === false; 
  
      let newUpVoteCount = prevThread.upVoteCount;
      let newDownVoteCount = prevThread.downVoteCount;
      let newIsUpVoted = prevThread.isUpVoted;
  
      if (hasUpvoted) {
        newUpVoteCount -= 1;
        newIsUpVoted = null; // Set isUpVoted to null
      } else if (hasDownvoted) {
        newUpVoteCount += 1;
        newDownVoteCount -= 1;
        newIsUpVoted = true; // Set isUpVoted to true
      } else {
        newUpVoteCount += 1;
        newIsUpVoted = true; // Set isUpVoted to true
      }
  
      return {
        ...prevThread,
        upVoteCount: newUpVoteCount,
        downVoteCount: newDownVoteCount,
        isUpVoted: newIsUpVoted, // Update the vote status correctly
      };
    });
  
    const params = {
      isDeleted: false,
      isUpVote: true,
      threadId: thread?.threadID,
      userId: getUserIdFromToken(),
      communityId: communityId,
    };
  
    updateVoteByThread(params, {
      onSuccess: () => {
        queryClient.invalidateQueries(["get_all_post"]);
      },
      onError: () => {
        // Rollback if there's an error
        setThread((prevThread) => ({
          ...prevThread,
          upVoteCount: prevUpVoteCount,
          downVoteCount: prevDownVoteCount,
        }));
      },
    });
  };
  
  const handleDownvote = () => {
    const communityId = parseInt(localStorage.getItem("communityId") || "");
    const prevUpVoteCount = thread?.upVoteCount || 0;
    const prevDownVoteCount = thread?.downVoteCount || 0;
    const hasUpvoted = thread?.isUpVoted === true;  // Check if upvoted
    const hasDownvoted = thread?.isUpVoted === false; // Check if downvoted
  
    setThread((prevThread) => {
      let newUpVoteCount = prevThread.upVoteCount;
      let newDownVoteCount = prevThread.downVoteCount;
      let newIsUpVoted = prevThread.isUpVoted;
  
      if (hasDownvoted) {
        newDownVoteCount -= 1;
        newIsUpVoted = null; // Set isUpVoted to null (no vote)
      } else if (hasUpvoted) {
        newUpVoteCount -= 1; // Remove the upvote
        newDownVoteCount += 1; // Add the downvote
        newIsUpVoted = false; // Set isUpVoted to false (downvoted)
      } else {
        newDownVoteCount += 1;
        newIsUpVoted = false; // Set isUpVoted to false (downvoted)
      }
  
      return {
        ...prevThread,
        upVoteCount: newUpVoteCount,
        downVoteCount: newDownVoteCount,
        isUpVoted: newIsUpVoted, // Update the vote status correctly
      };
    });
  
    const params = {
      isDeleted: false,
      isUpVote: false, // This is a downvote, so `isUpVote` is false
      threadId: thread?.threadID,
      userId: getUserIdFromToken(),
      communityId: communityId,
    };
  
    updateVoteByThread(params, {
      onSuccess: () => {
        //queryClient.refetchQueries(["get_all_post"]);
        queryClient.invalidateQueries (["get_all_post"])
      },
      onError: () => {
        // Rollback 
        setThread((prevThread) => ({
          ...prevThread,
          upVoteCount: prevUpVoteCount,
          downVoteCount: prevDownVoteCount,
        }));
      },
    });
  };
  
  
  const handleBookmark = (threadID: number | undefined, userID: string | undefined) => {
    const prevBookmarkState = thread?.isBookmark;
  
    setThread((prevThread) => ({
      ...prevThread,
      isBookmark: !prevThread.isBookmark,
    }));
  
    const bookmarkAction = prevBookmarkState ? unSaveBookmark : saveBookmark;
  
    bookmarkAction(
      { threadID, userID },
      {
        onSuccess: () => {
          queryClient.refetchQueries(["get_saved_post_list"]);
        },
        onError: () => {
          // Rollback 
          setThread((prevThread) => ({
            ...prevThread,
            isBookmark: prevBookmarkState,
          }));
        },
      }
    );
  };

  return (
    <article className="w-full space-y-3 overflow-hidden rounded-md bg-white p-3 shadow-sm">
      <div className="flex min-w-0 gap-x-2">
        <Avatar userName={item.createdByUser} size="medium" />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-tight text-slate-900">
            {item?.createdByUser}
          </p>
          <div className="flex">
            <p className="truncate text-xs text-slate-500">
              {item?.communityName}/{item?.categoryName}
            </p>
            <span className="text-[9px] text-slate-400 pl-2 pr-1">●</span>
            <p className="truncate text-xs text-slate-500">
              {dayjs(item?.createdAt).format("MMM D, YYYY")}
            </p>
          </div>
        </div>
      </div>
      <div
        className="space-y-1 cursor-pointer"
        onClick={(event) => {
          getCommunityId();
          handleItemClick(event, item?.threadID);
        }}
      >
        <h5 className="font-bold text-slate-900 prevent-text-break-out inline">{item?.title}</h5>
        <div className="flex gap-2 pb-2">
          {item?.tagNames?.map((tagItem, index) => (
            <button
              key={`${index}${tagItem}`}
              className="inline-flex cursor-pointer items-center rounded-full bg-primary-50 px-2 max-w-[300px] truncate py-1 text-xs font-medium leading-tight text-primary-800 ring-1 ring-inset ring-primary-600/10 hover:bg-primary-100 hover:ring-primary-800/10"
            >
              {tagItem}
            </button>
          ))}
        </div>
        <p className="text-slate-900 prevent-text-break-out inline">
          <span
            className="inline prose prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-a:text-sm ql-editor"
            style={{ paddingLeft: 0 }}
            dangerouslySetInnerHTML={createMarkup(
              trimHTMLContent(item?.content)
            )}
          />
          {getHtmlTextLength(item?.content) > 150 && (
            <button className="text-primary-800 underline inline">
              (More)
            </button>
          )}
        </p>
      </div>
      <div
        className="flex items-center space-x-3"   
      >
        <button
          title="Up vote"
          className="flex items-center justify-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
          onClick={() => handleUpvote()}
        >
          <ArrowBigUp
            size={23}
            className={`text-gray-600 ${
              item?.isUpvoted ? "fill-gray-600" : null
            }`}
          />{" "}
          <span className="sr-only">Up vote</span>
          {/* <span>{item?.upVoteCount}</span> */}
          <span>{thread?.upVoteCount}</span>
        </button>
        <button
          title="Down vote"
          className="flex items-center justify-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
          onClick={() => handleDownvote()}
        >
          <ArrowBigDown
            size={23}
            className={`text-gray-600 ${
              item?.isUpvoted === false ? "fill-gray-600" : null
            }`}
          />{" "}
          <span className="sr-only">Down vote</span>
          {/* <span>{item?.downVoteCount}</span> */}
          <span>{thread?.downVoteCount}</span>
        </button>
        <button
          title="Comment"
          className="flex items-center justify-center gap-1 rounded-full px-1.5 py-1.5 text-xs hover:bg-slate-200"
          onClick={() =>{ 
            getCommunityId();
            gotoPost(item?.threadID)}}
        >
          <MessageSquare size={15} className="text-gray-600" strokeWidth={3} />{" "}
          <span className="sr-only">Comment</span>
          <span>{item?.replyCount}</span>
        </button>
        <button
          className="flex items-center gap-1 rounded-full px-1.5 py-1.5 text-xs hover:bg-slate-200"
          title="Bookmark"
          onClick={() => handleBookmark(item?.threadID,userID)}
        >
          <Bookmark
            size={15}
            // className={`text-gray-600 ${
            //   item?.isBookmark ? "fill-gray-600" : null
            // }`}
            className={`text-gray-600 ${thread?.isBookmark ? "fill-gray-600" : ""}`}
            strokeWidth={3}
          />{" "}
          <span className="sr-only">Bookmark</span>
        </button>       
      </div>
    </article>
  );
}
