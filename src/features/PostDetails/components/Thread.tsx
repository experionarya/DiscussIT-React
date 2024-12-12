import React, { ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconMicro } from "@heroicons/react/16/solid";
import { BookmarkIcon as BookmarkIconMicro } from "@heroicons/react/16/solid";
import { ShareIcon as ShareIconMicro } from "@heroicons/react/16/solid";
import { PencilIcon } from "@heroicons/react/24/solid";
import * as Toast from "@radix-ui/react-toast";

import { Avatar } from "src/components";

import { useUpdateThreadVote } from "../api/useUpdateThreadVote";

import { getUserIdFromToken } from "src/utils/authenticationHelper/tokenHandler";
import { createMarkup } from "src/utils/common";

import { ThreadType } from "src/features/Community/types/postType";
import { useGetUserDetails } from "src/features/Header/api/useGetUserDetails";
import { useBookmarks } from "../api/useBookmarks";
import { usePostDetailsStore } from "../store/postDetailsStore";
import { useQueryClient } from "react-query";
import { useUnSaveBookmark } from "../api/useUnsaveBookmark";


dayjs.extend(utc);


type PostThreadType = {
  postDetails: ThreadType;
  setShowComment: any;
};

export function Thread({
  postDetails,
  setShowComment,
}: PostThreadType): ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const [threads, setThreads] = useState<ThreadType>();
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [open, setOpen] = React.useState(false);

  const { mutate: updateVoteByThread } = useUpdateThreadVote();
  const { data: userDetails } = useGetUserDetails();
  const { mutate: saveBookmark } = useBookmarks();

  const userID=getUserIdFromToken();
  const isBookmark = usePostDetailsStore((state) => state.isBookmark);
  const queryClient = useQueryClient();
  const { mutate: unSaveBookmark } = useUnSaveBookmark();
  



  useEffect(() => {
    if (postDetails) {
      setThreads(postDetails);
    }
  }, [postDetails]);

  useEffect(() => {
    const voteStatus = {
      [threads?.threadID || 0]: { hasUpvoted, hasDownvoted },
    };
    localStorage.setItem("voteStatus", JSON.stringify(voteStatus));
  }, [hasUpvoted, hasDownvoted, threads?.threadID]);

  const threadId = location.search.split("threadId=")[1];

  useEffect(() => {
    const savedVoteStatus =
      JSON.parse(localStorage.getItem("voteStatus") || "") || {};
    const postId = threads?.threadID || 0;
    setHasUpvoted(savedVoteStatus[postId]?.hasUpvoted || false);
    setHasDownvoted(savedVoteStatus[postId]?.hasDownvoted || false);
  }, [threads?.threadID]);

  const handleUpvote = () => {
    const communityId = parseInt(localStorage.getItem("communityId") || "");
    setThreads((prevPost: any) => {
      const updatedPost = {
        ...prevPost,
        upVoteCount: prevPost?.upVoteCount || 0,
        downVoteCount: prevPost?.downVoteCount || 0,
      };

      if (hasUpvoted) {
        updatedPost.upVoteCount = updatedPost?.upVoteCount - 1;
        setHasUpvoted(false);
      } else {
        if (hasDownvoted) {
          updatedPost.downVoteCount = updatedPost.downVoteCount - 1;
          setHasDownvoted(false);
        }
        updatedPost.upVoteCount = updatedPost.upVoteCount + 1;
        setHasUpvoted(true);
      }
      return updatedPost;
    });

    const params = {
      isDeleted: false,
      isUpVote: true,
      threadId: threads?.threadID,
      userId: getUserIdFromToken(),
      communityId: communityId,
    };
    updateVoteByThread({ ...params });
  };

  const handleDownvote = () => {
    const communityId = parseInt(localStorage.getItem("communityId") || "");
    setThreads((prevPost: any) => {
      const updatedPost = {
        ...prevPost,
        upVoteCount: prevPost.upVoteCount || 0,
        downVoteCount: prevPost.downVoteCount || 0,
      };

      if (hasDownvoted) {
        updatedPost.downVoteCount = updatedPost.downVoteCount - 1;
        setHasDownvoted(false);
      } else {
        if (hasUpvoted) {
          updatedPost.upVoteCount = updatedPost.upVoteCount - 1;
          setHasUpvoted(false);
        }
        updatedPost.downVoteCount = updatedPost.downVoteCount + 1;
        setHasDownvoted(true);
      }
      return updatedPost;
    });

    const params = {
      isDeleted: false,
      isUpVote: false,
      threadId: threads?.threadID,
      userId: getUserIdFromToken(),
      communityId: communityId,
    };
    updateVoteByThread({ ...params });
  };

  function onEdit() {
    navigate(`/community/category-posts/edit-posts?threadId=${threadId}`, {
      state: { from: window.location.pathname },
    });
  }

  const copyUrlToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  
  function handleBookmark(threadID: number | undefined, userID: string | undefined) {
    const { isBookmark } = usePostDetailsStore.getState();
    const updatedIsBookmark = !isBookmark;
    
    usePostDetailsStore.setState({ isBookmark: updatedIsBookmark });
  
    const bookmarkAction = isBookmark ? unSaveBookmark : saveBookmark;
    
    bookmarkAction({ threadID, userID }, {
      onSuccess: () => {
         usePostDetailsStore.setState({ isBookmark: updatedIsBookmark });
         queryClient.refetchQueries(["get_saved_post_list"]);
      },
      onError: () => {
        usePostDetailsStore.setState({ isBookmark: !updatedIsBookmark });
      },
    });
  }
    return (
    <>
      <div className="flex min-w-0 gap-x-2">
        <Avatar userName={threads?.createdByUser || ""} size="medium" />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-tight text-slate-900">
            {threads?.createdByUser}
          </p>
          <div className="flex">
            <p className="truncate text-xs  text-slate-500">
              {threads?.communityName}/{threads?.categoryName}
            </p>
            <span className="text-[9px] text-slate-400 pl-2 pr-1">●</span>
            <p className="truncate text-xs text-slate-500">
              {dayjs(threads?.createdAt).format("MMM D, YYYY")}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-1 cursor-pointer">
        <h5 className="font-semibold text-slate-900">{threads?.title}</h5>
        <div className="flex gap-2">
          {threads?.tagNames?.map((tagNameItem: string) => (
            <button className="inline-flex cursor-pointer items-center rounded-full bg-primary-50 px-2 max-w-[300px] truncate py-1 text-xs font-medium leading-tight text-primary-800 ring-1 ring-inset ring-primary-600/10 hover:bg-primary-100 hover:ring-primary-800/10">
              {tagNameItem}
            </button>
          ))}
        </div>
        <p
          className="text-slate-900 pt-1 prose prevent-text-break-out prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-a:text-sm"
          dangerouslySetInnerHTML={createMarkup(threads?.content)}
        />
      </div>
      <div className="flex space-x-3">
        <button
          title="Up vote"
          className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
          onClick={() => handleUpvote()}
        >
          <ArrowUpIconMicro className="size-4 text-gray-600" />
          <span className="sr-only">Up vote</span>
          <span>{threads?.upVoteCount}</span>
        </button>
        <button
          title="Down vote"
          className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
          onClick={() => handleDownvote()}
        >
          <ArrowDownIconMicro className="size-4 text-gray-600" />
          <span className="sr-only">Down vote</span>
          <span>{threads?.downVoteCount}</span>
        </button>
        <button
          title="Comment"
          className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
          onClick={() => {
            setShowComment(true);
          }}
        >
          <ChatBubbleOvalLeftIconMicro className="size-4 text-gray-600" />
          <span className="sr-only">Comment</span>
          <span>{threads?.replyCount}</span>
        </button>
        {userDetails?.userID === threads?.createdBy ? (
          <button
            className="flex items-center rounded-full px-1 py-0.5 hover:bg-slate-200"
            title="Edit"
            onClick={() => onEdit()}
          >
            <PencilIcon className="size-4 text-gray-600" />
            <span className="sr-only">Edit</span>
          </button>
        ) : null}
        <Toast.Provider swipeDirection="left">
          <button
            title="Share"
            className="flex items-center rounded-full px-1 py-0.5 hover:bg-slate-200"
            onClick={copyUrlToClipboard}
          >
            <ShareIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Share</span>
          </button>
          <Toast.Root
            className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
            open={open}
            onOpenChange={setOpen}
          >
            <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
              URL copied to clipboard!
            </Toast.Title>
            <Toast.Action
              className="[grid-area:_action]"
              asChild
              altText="Goto schedule to undo"
            >
              <button>
                <CheckCircleIcon className="size-6 text-green-600" />
              </button>
            </Toast.Action>
          </Toast.Root>
          <Toast.Viewport className="[--viewport-padding:_25px] fixed top-12 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
        </Toast.Provider>
        <button
          title="Bookmark"
          className="flex items-center rounded-full px-1 pr-2 py-0.5 hover:bg-slate-200"
          onClick={() => handleBookmark(threads?.threadID,userID)}
        >
          
          {/* <BookmarkIconMicro className="ml-1 size-4 text-gray-600" /> */}
          <BookmarkIconMicro className={`size-4 ${isBookmark ? "text-orange-600" : "text-gray-600"}`} />
          <span className="sr-only">Bookmark</span>
        </button>
      </div>
    </>
  );
}
