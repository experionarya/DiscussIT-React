import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconMicro } from "@heroicons/react/16/solid";
import { ShareIcon as ShareIconMicro } from "@heroicons/react/16/solid";
import { BookmarkIcon as BookmarkIconMicro } from "@heroicons/react/16/solid";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { trimHTMLContent } from "src/utils/common";

import { ThreadType } from "src/features/Community/types/postType";

dayjs.extend(utc);

type PostItemType = {
  postItem: ThreadType;
};

export function PostItem({ postItem }: PostItemType): ReactElement {
  const navigate = useNavigate();

  function gotoPost() {
    navigate(
      `/community/category-posts/replies?threadId=${postItem?.threadID}`
    );
  }

  const createMarkup = (data?: string) => {
    return { __html: data || "" };
  };

  return (
    <>
      <article className="w-full space-y-3 overflow-hidden rounded-md bg-white p-3 shadow-sm">
        <div className="flex min-w-0 gap-x-2">
          <img
            className="h-8 w-8 flex-none rounded-full bg-gray-50"
            src={require(`../../../../../assets/images/person-4.jpg`)}
            alt=""
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-tight text-slate-900">
              {postItem?.createdByUser}
            </p>
            <p className="truncate text-xs leading-tight text-slate-500">
              {dayjs(postItem?.createdAt).format("MMM D, YYYY")}
            </p>
          </div>
        </div>
        <div className="space-y-1 cursor-pointer" onClick={gotoPost}>
          <h5 className="font-semibold text-slate-900">{postItem?.title}</h5>
          <div className="flex gap-2">
            {postItem?.tagNames?.map((tagItem: string) => (
              <button className="inline-flex cursor-pointer items-center rounded-full bg-primary-50 px-2 max-w-[300px] truncate py-1 text-xs font-medium leading-tight text-primary-800 ring-1 ring-inset ring-primary-600/10 hover:bg-primary-100 hover:ring-primary-800/10">
                {tagItem}
              </button>
            ))}
          </div>
          <p
            className="text-slate-900"
            dangerouslySetInnerHTML={createMarkup(
              trimHTMLContent(postItem?.content)
            )}
          />
          {postItem?.content?.length > 100 && (
            <button className="text-primary-800 underline">(More)</button>
          )}
        </div>
        {/* <img
          src={require(`../../../../../assets/images/Java.png`)}
          alt="java"
          className="cursor-pointer"
          onClick={gotoPost}
        /> */}
        <div className="flex space-x-3" onClick={gotoPost}>
          <button
            title="Up vote"
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
          >
            <ArrowUpIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Up vote</span>
            <span>{postItem?.upVoteCount}</span>
          </button>
          <button
            title="Down vote"
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
          >
            <ArrowDownIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Down vote</span>
            <span>{postItem?.downVoteCount}</span>
          </button>
          <button
            title="Comment"
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
            onClick={gotoPost}
          >
            <ChatBubbleOvalLeftIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Comment</span>
            <span>{postItem?.replyCount}</span>
          </button>
          <button
            title="Share"
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
          >
            <ShareIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Share</span>
          </button>
          <button
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
            title="Bookmark"
          >
            <BookmarkIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Bookmark</span>
          </button>
        </div>
      </article>
    </>
  );
}
