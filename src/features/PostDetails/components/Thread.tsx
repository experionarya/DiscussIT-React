import React, { ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconMicro } from "@heroicons/react/16/solid";
import { BookmarkIcon as BookmarkIconMicro } from "@heroicons/react/16/solid";
import { ShareIcon as ShareIconMicro } from "@heroicons/react/16/solid";
import { PencilIcon } from "@heroicons/react/24/solid";

import { ThreadType } from "src/features/Community/types/postType";

import { useUpdateThreadVote } from "../api/useUpdateThreadVote";

import { getUserIdFromToken } from "src/utils/authenticationHelper/tokenHandler";
import { createMarkup } from "src/utils/common";

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

  const { mutate: updateVoteByThread } = useUpdateThreadVote();

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

  const threadId = location.search.split("threadID=")[1];

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
    navigate(`/community/category-posts/edit-posts?threadId=${threadId}`);
  }

  return (
    <>
      <div className="flex min-w-0 gap-x-2">
        <img
          className="h-8 w-8 flex-none rounded-full bg-gray-50"
          src={require(`../../../assets/images/person-4.jpg`)}
          alt=""
        />
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
        <p
          className="text-slate-900"
          dangerouslySetInnerHTML={createMarkup(threads?.content)}
        />
      </div>
      {/* <img
        src={require(`../../../assets/images/Java.png`)}
        alt="java"
        className="cursor-pointer"
      /> */}
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
            console.log("on lcickkkkkkkkkkkkk");
            setShowComment(true);
          }}
        >
          <ChatBubbleOvalLeftIconMicro className="size-4 text-gray-600" />
          <span className="sr-only">Comment</span>
          <span>{threads?.replyCount}</span>
        </button>
        <button
          className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
          title="Bookmark"
          onClick={() => onEdit()}
        >
          <PencilIcon className="size-4 text-gray-600" />
          <span className="sr-only">Edit</span>
        </button>
        <button
          title="Share"
          className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
        >
          <ShareIconMicro className="size-4 text-gray-600" />
          <span className="sr-only">Share</span>
        </button>
        <button
          title="Bookmark"
          className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
        >
          <BookmarkIconMicro className="ml-1 size-4 text-gray-600" />
          <span className="sr-only">Bookmark</span>
        </button>
      </div>
    </>
  );
}
