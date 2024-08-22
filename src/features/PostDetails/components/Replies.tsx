import React, { ReactElement, useEffect, useState } from "react";

import { SingleReply } from "./SingleReply";

import { useUpdateVote } from "../api";

import { usePostDetailsStore } from "../store/postDetailsStore";
import { getUserIdFromToken } from "src/utils/authenticationHelper/tokenHandler";

import { ReplyType, SingleReplyType, UpdateVoteType } from "../types/replies";

export function Replies(): ReactElement {
  const primaryReplies = usePostDetailsStore(
    React.useCallback((state: any) => state.primaryReplies, [])
  );

  const { mutate: updateVote } = useUpdateVote();

  const [replies, setReplies] = useState(primaryReplies.replies);
  const [votes, setVotes] = useState<{
    [key: number]: { upvoted: boolean; downvoted: boolean };
  }>({});

  useEffect(() => {
    if (primaryReplies) {
      const temp = primaryReplies?.replies?.filter(
        (item: ReplyType) => item?.isDeleted === false
      );
      setReplies(temp);
    }
  }, [primaryReplies]);
  
  console.log(replies,"replies");

  useEffect(() => {
    const storedVotes = localStorage.getItem("votes");
    if (storedVotes) {
      setVotes(JSON.parse(storedVotes));
    }
  }, []);

  const handleUpvote = (replyID: number) => {
    setVotes((prevVotes) => {
      const currentVote = prevVotes[replyID] || {
        upvoted: false,
        downvoted: false,
      };
      const newVote = {
        upvoted: !currentVote.upvoted,
        downvoted:
          currentVote.downvoted && !currentVote.upvoted
            ? false
            : currentVote.downvoted,
      };

      localStorage.setItem(
        "votes",
        JSON.stringify({
          ...prevVotes,
          [replyID]: newVote,
        })
      );

      return {
        ...prevVotes,
        [replyID]: newVote,
      };
    });

    setReplies((prevReplies: any) =>
      updateVoteCount(prevReplies, replyID, "upvote")
    );
  };

  const handleDownvote = (replyID: number) => {
    setVotes((prevVotes) => {
      const currentVote = prevVotes[replyID] || {
        upvoted: false,
        downvoted: false,
      };
      const newVote = {
        upvoted:
          currentVote.upvoted && !currentVote.downvoted
            ? false
            : currentVote.upvoted,
        downvoted: !currentVote.downvoted,
      };

      localStorage.setItem(
        "votes",
        JSON.stringify({
          ...prevVotes,
          [replyID]: newVote,
        })
      );

      return {
        ...prevVotes,
        [replyID]: newVote,
      };
    });

    setReplies((prevReplies: any) =>
      updateVoteCount(prevReplies, replyID, "downvote")
    );
  };

  const updateVoteCount = (
    comments: Array<ReplyType>,
    replyID: number,
    type: "upvote" | "downvote"
  ): Array<ReplyType> => {
    let params: UpdateVoteType;
    const communityId = parseInt(localStorage.getItem("communityId") || "");

    const updateReplyVotes = (reply: ReplyType): ReplyType => {
      if (reply.replyID === replyID) {
        if (type === "upvote") {
          params = {
            downvoteCount: reply?.downvoteCount,
            isDeleted: reply?.isDeleted,
            isUpVote: true,
            replyId: reply?.replyID,
            upvoteCount: reply?.upvoteCount + 1,
            userId: getUserIdFromToken(),
            communityId: communityId,
          };
          updateVote({ ...params });
          const newUpvoteCount = votes[replyID]?.upvoted
            ? reply.upvoteCount - 1
            : reply.upvoteCount + 1;
          return {
            ...reply,
            upvoteCount: newUpvoteCount,
          };
        } else {
          params = {
            downvoteCount: reply?.downvoteCount + 1,
            isDeleted: reply?.isDeleted,
            isUpVote: false,
            replyId: reply?.replyID,
            upvoteCount: reply?.upvoteCount,
            userId: getUserIdFromToken(),
            communityId: communityId,
          };
          updateVote({ ...params });
          const newDownvoteCount = votes[replyID]?.downvoted
            ? reply.downvoteCount - 1
            : reply.downvoteCount + 1;
          return {
            ...reply,
            downvoteCount: newDownvoteCount,
          };
        }
      }

      if (reply.children) {
        return { ...reply, children: reply.children.map(updateReplyVotes) };
      }

      return reply;
    };
    return comments.map(updateReplyVotes);
  };

  return (
    <>
      {replies?.map((primaryItem: SingleReplyType) => (
        <SingleReply
          key={primaryItem?.replyID}
          reply={primaryItem}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
          votes={
            votes[primaryItem.replyID] || { upvoted: false, downvoted: false }
          }
        />
      ))}
    </>
  );
}
