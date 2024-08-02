import React, { ReactElement, useRef, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { CheckCircleIcon as CheckCircleIconMicro } from "@heroicons/react/16/solid";
import { PencilSquareIcon as PencilSquareIconMicro } from "@heroicons/react/16/solid";
import { TrashIcon as TrashIconMicro } from "@heroicons/react/16/solid";

import { Button } from "src/components/Button";
import DialogBox from "./DialogBox";

import { usePostDetailsStore } from "../store/postDetailsStore";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { fetchInnerReplies } from "../store/apiStore";

import { ReplyType, SingleReplyType } from "../types/replies";

dayjs.extend(utc);

type IndividualReplyType = {
  reply: SingleReplyType;
  onUpvote: (replyID: number) => any;
  onDownvote: (replyID: number) => any;
  votes: { upvoted: boolean; downvoted: boolean };
};

export function SingleReply({
  reply,
  onUpvote,
  onDownvote,
  votes,
}: IndividualReplyType): ReactElement {
  const { tokenType } = useAuth();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const [showReplies, setShowReplies] = useState(false);
  const [children, setChildren] = useState<ReplyType[]>([]);
  const [isReply, setIsReplay] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const createMarkup = (data?: string) => {
    return { __html: data || "" };
  };

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

      usePostDetailsStore.getState().setNestedReply(fetchedReplies);
      setChildren(transformReplies(fetchedReplies));
    }
    setShowReplies(!showReplies);
  };

  function handleReplay() {
    setIsReplay(true);
  }

  function handleReplayCancel() {
    setIsReplay(false);
  }

  function handleDelete() {
    setIsDelete(true);
  }

  function getDays() {
    const day = dayjs().diff(reply?.createdAt, "day");
    if (day === 1) return `.${day} day`;
    else return `.${day} days`;
  }

  function getChildRepliesLabel() {
    if (reply?.childReplyCount === 1) return `${reply?.childReplyCount} Reply`;
    else if (reply?.childReplyCount > 1)
      return `${reply?.childReplyCount} Replies`;
  }

  function renderPostActions() {
    return (
      <>
        {isReply ? (
          <div className="rounded-lg border mt-2 border-stroke-weak bg-white w-full">
            <textarea
              ref={textareaRef}
              className="h-auto w-full min-h-9 pt-1 rounded-lg pl-2 outline-none overflow-hidden resize-none"
              placeholder="Add comment"
              rows={1}
              onInput={autoResize}
            />
            <div className="flex gap-1 justify-end m-1">
              <Button
                size="medium"
                variant="secondary"
                onClick={handleReplayCancel}
              >
                Cancel
              </Button>
              <Button size="medium" variant="primary">
                Comment
              </Button>
            </div>
          </div>
        ) : null}
        {isDelete ? (
          <div>
            <DialogBox
              title="Delete Comment"
              description="Are sure you want delete comment?"
              button1="Cancel"
              button2="Delete"
              opened={isDelete}
            />
          </div>
        ) : null}
      </>
    );
  }

  return (
    <div className="pl-10">
      <div className="flex min-w-0 gap-x-2 pl-3 pt-0 mt-0 mb-5">
        <img
          className="h-8 w-8 flex-none rounded-full bg-gray-50"
          src={require(`../../../assets/images/person-5.jpg`)}
          alt="avatar"
        />
        <div className="mt-1">
          <div className="min-w-0 flex">
            <p className="text-sm font-semibold leading-tight text-slate-900">
              {reply?.createdUserName}
            </p>
            <p className="truncate text-xs leading-tight text-slate-500 ml-1 mt-0.5">
              {getDays()}
            </p>
            <button className="ml-1" title="Best Answer">
              <CheckCircleIconMicro className="size-4 text-green-500" />
              <span className="sr-only">Best Answer</span>
            </button>
          </div>
          <p
            className="text-slate-900 dark:text-slate-300 mt-1"
            dangerouslySetInnerHTML={createMarkup(reply?.content)}
          />
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
            <button
              title="Edit"
              onClick={handleReplay}
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
            {reply?.childReplyCount !== 0 ? (
              <Button
                onClick={() => {
                  handleToggleReplies();
                }}
              >
                {getChildRepliesLabel()}
              </Button>
            ) : null}
          </div>

          {renderPostActions()}

          {showReplies && reply?.childReplyCount !== 0
            ? children?.map((innerItem: SingleReplyType) => (
                <SingleReply
                  key={innerItem.replyID}
                  reply={innerItem}
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
