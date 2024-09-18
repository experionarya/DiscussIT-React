import React, { ReactElement, useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import {
  ArrowDownIcon as ArrowDownIconMicro,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { CheckCircleIcon as CheckCircleIconMicro } from "@heroicons/react/16/solid";
import { PencilSquareIcon as PencilSquareIconMicro } from "@heroicons/react/16/solid";
import { TrashIcon as TrashIconMicro } from "@heroicons/react/16/solid";

import { Avatar, Button, DialogBox, TextEditor } from "src/components";

import {
  useDeleteReply,
  useReplaceDeletedComment,
  useGetChildReply,
} from "../api";
import { useUnmarkBestAnswer, useMarkAsBestAnswer } from "../api/index";
import { useGetUserDetails } from "src/features/Header/api/useGetUserDetails";

import {
  getParsedToken,
  getUserIdFromToken,
} from "src/utils/authenticationHelper/tokenHandler";
import { contentWarning } from "src/features/CreatePost/utils/postConstants";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { createMarkup } from "src/utils/common";
import { fetchInnerReplies } from "../store/apiStore";
import { usePostDetailsStore } from "../store/postDetailsStore";

import { ReplyType, SingleReplyType } from "../types/replies";
import { ThreadType } from "src/features/Community/types/postType";

dayjs.extend(utc);

type IndividualReplyType = {
  reply: SingleReplyType;
  onUpvote: (replyID: number) => any;
  onDownvote: (replyID: number) => any;
  votes: { upvoted: boolean; downvoted: boolean };
  postDetails: ThreadType;
  bestAnswer: number | undefined;
};

export function SingleReply({
  reply,
  onUpvote,
  onDownvote,
  votes,
  postDetails,
  bestAnswer,
}: IndividualReplyType): ReactElement {
  const { tokenType } = useAuth();
  const userId = getUserIdFromToken();

  const communityId = parseInt(localStorage.getItem("communityId") || "");
  const [showReplies, setShowReplies] = useState(false);
  const [children, setChildren] = useState<ReplyType[]>([]);
  const [isReply, setIsReply] = useState(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [replyValue, setReplyValue] = useState<string>();
  const [isTextArea, setIsTextArea] = useState<boolean>();

  const getPostDetailsInfo = usePostDetailsStore(
    React.useCallback((state: any) => state.getPostDetailsInfo, [])
  );

  const getReplyDetails = usePostDetailsStore(
    useCallback((state) => state.getReplyDetails, [])
  );

  const setReplyDetails = usePostDetailsStore(
    React.useCallback((state: any) => state.setReplyDetails, [])
  );

  const replyDetails = usePostDetailsStore(
    React.useCallback((state: any) => state.replyDetails, [])
  );

  const replyDet = useMemo(() => {
    return isEdit ? replyDetails[reply?.replyID] : replyValue;
  }, [isEdit, reply?.replyID, replyDetails, replyValue]);

  const { data: userDetails } = useGetUserDetails();
  const { mutate: deleteReply } = useDeleteReply();
  const { mutate: replaceDeletedComment } = useReplaceDeletedComment();
  const { mutate: childReply } = useGetChildReply();
  const { mutate: markAsBestAnswerType } = useMarkAsBestAnswer();
  const { mutate: unMarkBestAnswerType } = useUnmarkBestAnswer();

  function transformReplies(replies: Array<SingleReplyType>) {
    const replyMap: { [key: number]: ReplyType } = {};
    const rootReplies: Array<ReplyType> = [];

    replies.forEach((replyItem: SingleReplyType) => {
      replyMap[replyItem.replyID] = { ...replyItem, children: [] };
    });

    replies.forEach((replyItem: SingleReplyType) => {
      const parentReplyID = reply.parentReplyID;
      if (parentReplyID === null || !replyMap[parentReplyID]) {
        rootReplies.push(replyMap[replyItem.replyID]);
      } else {
        const parent = replyMap[parentReplyID];
        if (parent) {
          parent?.children?.push(replyMap[replyItem.replyID]);
        }
      }
    });

    return rootReplies;
  }

  const handleToggleReplies = async () => {
    if (!showReplies && reply.childReplyCount > 0 && children.length === 0) {
      const fetchedReplies = await fetchInnerReplies({
        token: getParsedToken(),
        tokenType,
        threadId: reply.threadID,
        replyId: reply?.replyID,
      });

      const filteredReplies = fetchedReplies?.filter(
        (item: ReplyType) => item?.isDeleted === false
      );

      usePostDetailsStore.getState().setNestedReply(filteredReplies);
      setChildren(transformReplies(filteredReplies));
    }
    setShowReplies(!showReplies);
  };

  function handleReplay() {
    setIsReply(true);
    setReplyValue("");
  }

  function handleEdit() {
    setIsEdit(true);
    setIsReply(true);
    getReplyDetails({
      token: getParsedToken(),
      tokenType: tokenType,
      replyId: reply.replyID,
    });
  }

  function handleReplayCancel() {
    setIsReply(false);
  }

  function handleDelete() {
    setIsDeleteConfirm(true);
  }

  function handleDeleteComments() {
    const params = {
      replyId: reply?.replyID,
      userId: userId,
      communityId: communityId,
    };

    deleteReply({ ...params });
    replaceDeletedComment(
      { replyId: reply?.replyID, userId: userId },
      {
        onSuccess: () => {
          getPostDetailsInfo({
            token: getParsedToken(),
            tokenType: tokenType,
            threadId: reply?.threadID,
          });
        },
      }
    );
    setIsDeleteConfirm(false);
  }

  function handleDeleteConfirmClose() {
    setIsDeleteConfirm(false);
  }

  function handleSubmitReplies() {
    const params = {
      threadId: isEdit ? reply?.replyID : reply?.threadID,
      userId: userId,
      communityId: communityId,
      parentReplyId: reply.replyID,
      reply: isEdit ? replyDetails[reply?.replyID] : replyValue,
      isEdit: isEdit,
    };

    childReply(params, {
      onSuccess: async () => {
        setIsReply(false);
        getPostDetailsInfo({
          token: getParsedToken(),
          tokenType: tokenType,
          threadId: reply?.threadID,
        });
      },
    });
  }

  function getDays() {
    const day = dayjs().diff(reply?.createdAt, "day");
    const hour = dayjs().diff(reply?.createdAt, "hour");
    const week = dayjs().diff(reply?.createdAt, "week");
    const month = dayjs().diff(reply?.createdAt, "month");
    const year = dayjs().diff(reply?.createdAt, "year");

    if (day === 0) return `.${hour} ${hour === 1 ? "hour" : "hours"}`;
    if (day >= 1 && day < 7) return `.${day} ${day === 1 ? "day" : "days"}`;
    if (day >= 7 && day < 30)
      return `.${week} ${week === 1 ? "week" : "weeks"}`;
    if (day >= 30 && day < 365)
      return `.${month} ${month === 1 ? "month" : "months"}`;
    if (day >= 365) return `.${year} ${year === 1 ? "year" : "years"}`;

    return `.${day} days`;
  }

  function getChildRepliesLabel() {
    if (reply?.childReplyCount === 1)
      return `View ${reply?.childReplyCount} more Reply`;
    else if (reply?.childReplyCount > 1)
      return `View ${reply?.childReplyCount} more Replies`;
  }

  function getChildHideRepliesLabel() {
    if (reply?.childReplyCount === 1) return `Hide Reply`;
    else if (reply?.childReplyCount > 1) return `Hide Replies`;
  }

  function isHideEditDelete() {
    if (userId === reply?.createdBy) return true;
    else return false;
  }

  function handleTextArea() {
    setIsTextArea(true);
  }

  function handleMarkAsBestAnswer() {
    const params = {
      replyId: reply?.replyID,
      createdBy: reply?.createdBy,
    };
    markAsBestAnswerType({ ...params });
  }

  function handleUnMarkAsBestAnswer() {
    const params = {
      replyId: reply?.replyID,
      modifiedBy: userId,
    };
    unMarkBestAnswerType({ ...params });
  }

  function renderPostActions() {
    return (
      <div className="pt-3">
        {isReply ? (
          !isTextArea ? (
            <button
              type="button"
              className="border border-stroke-weak rounded-md bg-white h-9 w-full flex justify-start items-center pl-2 cursor-text"
              onClick={handleTextArea}
            >
              <span className="sr-only md:not-sr-only md:text-slate-400 md:dark:text-slate-400">
                Add comment
              </span>
            </button>
          ) : (
            <div className="rounded-lg  mt-2 border-stroke-weak bg-white w-full">
              <TextEditor
                id="reply"
                value={isEdit ? replyDetails[reply?.replyID] : replyValue}
                onChange={(e: any) => {
                  isEdit && setReplyDetails({ [reply?.replyID]: e });
                  !isEdit && setReplyValue(e);
                }}
              />
              {replyDet && replyDet?.length < 20 && (
                <p className="text-red-500 text-sm pl-2 pt-1">
                  {contentWarning}
                </p>
              )}
              <div className="flex gap-1 justify-end m-1">
                <Button
                  size="medium"
                  variant="secondary"
                  onClick={handleReplayCancel}
                >
                  Cancel
                </Button>
                <Button
                  size="medium"
                  variant="primary"
                  onClick={handleSubmitReplies}
                  disabled={replyDet?.length < 20}
                >
                  Reply
                </Button>
              </div>
            </div>
          )
        ) : null}
        {isDeleteConfirm ? (
          <div>
            <DialogBox
              title="Delete Comment"
              description="Are you sure you want to delete this comment?"
              button1="Cancel"
              button2="Delete"
              opened={isDeleteConfirm}
              handleClose={handleDeleteConfirmClose}
              handleAction={handleDeleteComments}
            />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex w-full gap-x-2 p-3">
      <div>
        <Avatar userName={reply?.createdUserName || ""} size="small" />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex">
          <p className="text-sm font-semibold leading-tight text-slate-900">
            {reply?.createdUserName}
          </p>
          <p className="text-xs leading-tight text-slate-500 ml-1 mt-0.5">
            {getDays()}
          </p>
          {bestAnswer === reply?.replyID ? (
            <div className="flex rounded-full bg-slate-200 ml-3 py-0.5 px-0.5">
              <div className="flex">
                <button title="Best Answer">
                  <CheckCircleIconMicro className="size-4 text-green-500" />
                </button>
                {postDetails?.createdBy === userDetails?.userID && (
                  <button
                    title="Cancel Best Answer"
                    onClick={handleUnMarkAsBestAnswer}
                  >
                    <XMarkIcon className="size-4 text-slate-400" />
                  </button>
                )}
              </div>
            </div>
          ) : postDetails?.createdBy === userDetails?.userID &&
            (postDetails?.createdBy !== reply?.createdBy ||
              (postDetails?.createdBy === reply?.createdBy &&
                bestAnswer !== reply?.replyID)) ? (
            <div className="flex items-center rounded-full bg-slate-200 ml-3 py-0.5 px-0.5">
              <button
                title="Mark as Best Answer"
                onClick={handleMarkAsBestAnswer}
              >
                <CheckCircleIconMicro className="size-4 text-slate-500" />
                <span className="sr-only">Best Answer</span>
              </button>
            </div>
          ) : null}
        </div>
        <div className="w-full">
          <p
            className="text-slate-900 dark:text-slate-300 mt-1 prevent-text-break-out"
            dangerouslySetInnerHTML={createMarkup(reply?.content)}
          />
        </div>
        <div className="flex mt-2 space-x-3">
          <button
            title="Up vote"
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
            onClick={() => onUpvote(reply.replyID)}
          >
            <ArrowUpIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Up vote</span>
            <span>{reply?.upvoteCount}</span>
          </button>
          <button
            title="Down vote"
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
            onClick={() => onDownvote(reply.replyID)}
          >
            <ArrowDownIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Down vote</span>
            <span>{reply?.downvoteCount}</span>
          </button>
          <button
            className="rounded-full px-1 py-0.5 text-xs hover:bg-slate-200 font-semibold text-gray-600"
            onClick={handleReplay}
          >
            Reply
          </button>
          {isHideEditDelete() && (
            <>
              <button
                title="Edit"
                onClick={handleEdit}
                className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
              >
                <PencilSquareIconMicro className="size-4 text-gray-600" />
                <span className="sr-only">Edit</span>
              </button>
              <button
                title="Delete"
                onClick={handleDelete}
                className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
              >
                <TrashIconMicro className="size-4 text-gray-600" />
                <span className="sr-only">Delete</span>
              </button>
            </>
          )}

          {reply?.childReplyCount !== 0 && (
            <button
              title="Comment"
              className="rounded-full px-2 py-0.5 text-xs bg-slate-100 hover:bg-slate-200 font-semibold text-gray-600"
              onClick={handleToggleReplies}
            >
              {showReplies
                ? getChildHideRepliesLabel()
                : getChildRepliesLabel()}
              <span className="sr-only">Comment</span>
            </button>
          )}
        </div>
        <div>
          {renderPostActions()}

          {showReplies && reply?.childReplyCount !== 0
            ? children?.map((innerItem: SingleReplyType) => (
                <SingleReply
                  key={innerItem.replyID}
                  reply={innerItem}
                  postDetails={postDetails}
                  bestAnswer={bestAnswer}
                  onUpvote={onUpvote}
                  onDownvote={onDownvote}
                  votes={votes}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
