import React, { ReactElement } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconMicro } from "@heroicons/react/16/solid";
import { PencilIcon } from "@heroicons/react/24/solid";
import { ShareIcon as ShareIconMicro } from "@heroicons/react/16/solid";
import { BookmarkIcon as BookmarkIconMicro } from "@heroicons/react/16/solid";

import {
  createMarkup,
  getHtmlTextLength,
  trimHTMLContent,
} from "src/utils/common";

import { BookMark } from "src/features/Home/types/bookMarkDataType";

export function PostItem({ item }: { item: BookMark }): ReactElement {
  const navigate = useNavigate();

  function gotoPost(id: number) {
    navigate(`/community/category-posts/replies?threadId=${id}`);
  }

  return (
    <>
      <article className="w-full space-y-3 overflow-hidden rounded-md bg-white p-3 shadow-sm">
        <div className="flex min-w-0 gap-x-2">
          <img
            className="h-8 w-8 flex-none rounded-full bg-gray-50"
            src={require(`../../../../assets/images/person-4.jpg`)}
            alt=""
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-tight text-slate-900">
              {item?.createdByUser}
            </p>
            <div className="flex">
              <p className="truncate text-xs  text-slate-500">
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
          onClick={() => gotoPost(item?.threadID)}
        >
          <h5 className="font-bold text-slate-900">{item?.title}</h5>
          {item?.tagNames?.map((tagItem, index) => (
            <button
              key={`${index}${tagItem}`}
              className="inline-flex cursor-pointer items-center rounded-full bg-primary-50 px-2 max-w-[300px] truncate py-1 text-xs font-medium leading-tight text-primary-800 ring-1 ring-inset ring-primary-600/10 hover:bg-primary-100 hover:ring-primary-800/10"
            >
              {tagItem}
            </button>
          ))}
          <p
            className="text-slate-900"
            dangerouslySetInnerHTML={createMarkup(
              trimHTMLContent(item?.content)
            )}
          />
          {getHtmlTextLength(item?.content) > 100 && (
            <button className="text-primary-800 underline">(More)</button>
          )}
        </div>
        {/* <img
          src={require(`../../../../assets/images/Java.png`)}
          alt="java"
          className="cursor-pointer"
          onClick={gotoPost}
        /> */}
        <div className="flex space-x-3">
          <button
            title="Up vote"
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
          >
            <ArrowUpIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Up vote</span>
            <span>{item?.upVoteCount}</span>
          </button>
          <button
            title="Down vote"
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
          >
            <ArrowDownIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Down vote</span>
            <span>{item?.downVoteCount}</span>
          </button>
          <button
            title="Comment"
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
            onClick={() => gotoPost(item?.threadID)}
          >
            <ChatBubbleOvalLeftIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Comment</span>
            <span>{item?.replyCount}</span>
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
