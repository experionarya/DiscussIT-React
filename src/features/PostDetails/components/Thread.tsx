import React, { ReactElement } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconMicro } from "@heroicons/react/16/solid";
import { BookmarkIcon as BookmarkIconMicro } from "@heroicons/react/16/solid";

import { ShareIcon as ShareIconMicro } from "@heroicons/react/16/solid";
import { ThreadType } from "src/features/Community/types/postType";

dayjs.extend(utc);

type PostThreadType = {
  postDetails: ThreadType;
};

export function Thread({ postDetails }: PostThreadType): ReactElement {
  const createMarkup = (data?: string) => {
    return { __html: data || "" };
  };

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
            {postDetails?.createdByUser}
          </p>
          <p className="truncate text-xs leading-tight text-slate-500">
            {dayjs(postDetails?.createdAt).format("MMM D, YYYY")}
          </p>
        </div>
      </div>
      <div className="space-y-1 cursor-pointer">
        <h5 className="font-semibold text-slate-900">{postDetails?.title}</h5>
        <p
          className="text-slate-900"
          dangerouslySetInnerHTML={createMarkup(postDetails?.content)}
        />
      </div>
      <img
        src={require(`../../../assets/images/Java.png`)}
        alt="java"
        className="cursor-pointer"
      />
      <div className="flex space-x-3">
        <button
          title="Up vote"
          className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
        >
          <ArrowUpIconMicro className="size-4 text-gray-600" />
          <span className="sr-only">Up vote</span>
          <span>{postDetails?.upVoteCount}</span>
        </button>
        <button
          title="Down vote"
          className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
        >
          <ArrowDownIconMicro className="size-4 text-gray-600" />
          <span className="sr-only">Down vote</span>
          <span>{postDetails?.downVoteCount}</span>
        </button>
        <button
          title="Comment"
          className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
        >
          <ChatBubbleOvalLeftIconMicro className="size-4 text-gray-600" />
          <span className="sr-only">Comment</span>
          <span>{postDetails?.replyCount}</span>
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
