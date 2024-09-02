import React, { ReactElement, useEffect, useMemo, useState } from "react";

import { SingleReply } from "./SingleReply";

import { useUpdateVote } from "../api";
import { useGetBestAnswer } from "../api/index";

import { usePostDetailsStore } from "../store/postDetailsStore";
import { getUserIdFromToken } from "src/utils/authenticationHelper/tokenHandler";

import { ReplyType, SingleReplyType, UpdateVoteType } from "../types/replies";

type PostType = {
  postDetails: SingleReplyType;
};

export function Replies({ postDetails }: PostType): ReactElement {
  const primaryReplies = usePostDetailsStore(
    React.useCallback((state: any) => state.primaryReplies, [])
  );

  const [replies, setReplies] = useState(primaryReplies.replies);
  const [votes, setVotes] = useState<{
    [key: number]: { upvoted: boolean; downvoted: boolean };
  }>({});
  const { mutate: updateVote } = useUpdateVote();
  const { data: bestAnswer } = useGetBestAnswer(postDetails.threadID);

  useEffect(() => {
    if (primaryReplies) {
      const temp = primaryReplies?.replies?.filter(
        (item: ReplyType) => item?.isDeleted === false
      );
      setReplies(temp);
    }
  }, [primaryReplies]);

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
    const communityId = parseInt(localStorage.getItem("communityId") || "");

    const updateReplyVotes = (reply: ReplyType): ReplyType => {
      if (reply.replyID === replyID) {
        const currentVote = votes[replyID] || {
          upvoted: false,
          downvoted: false,
        };
        let newUpvoteCount = reply.upvoteCount;
        let newDownvoteCount = reply.downvoteCount;

        if (type === "upvote") {
          if (currentVote.upvoted) {
            newUpvoteCount -= 1;
          } else {
            newUpvoteCount += 1;
            if (currentVote.downvoted) {
              newDownvoteCount -= 1;
            }
          }
        } else {
          if (currentVote.downvoted) {
            newDownvoteCount -= 1;
          } else {
            newDownvoteCount += 1;
            if (currentVote.upvoted) {
              newUpvoteCount -= 1;
            }
          }
        }

        const params: UpdateVoteType = {
          downvoteCount: newDownvoteCount,
          isDeleted: reply.isDeleted,
          isUpVote: type === "upvote",
          replyId: reply.replyID,
          upvoteCount: newUpvoteCount,
          userId: getUserIdFromToken(),
          communityId,
        };

        updateVote({ ...params });

        return {
          ...reply,
          upvoteCount: newUpvoteCount,
          downvoteCount: newDownvoteCount,
        };
      }

      if (reply.children) {
        return { ...reply, children: reply.children.map(updateReplyVotes) };
      }

      return reply;
    };

    return comments.map(updateReplyVotes);
  };

  const sortedReplies = useMemo(() => {
    if (!bestAnswer) return replies;

    return replies?.slice().sort((a: SingleReplyType, b: SingleReplyType) => {
      if (a?.replyID === bestAnswer) return -1;
      if (b?.replyID === bestAnswer) return 1;
      return 0;
    });
  }, [replies, bestAnswer]);

  return (
    <>
      {sortedReplies?.map((primaryItem: SingleReplyType) => (
        <SingleReply
          key={primaryItem?.replyID}
          reply={primaryItem}
          postDetails={postDetails}
          bestAnswer={bestAnswer}
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
