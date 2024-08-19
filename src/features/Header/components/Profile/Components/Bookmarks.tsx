import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconMicro } from "@heroicons/react/16/solid";
import { ShareIcon as ShareIconMicro } from "@heroicons/react/16/solid";
import { BookmarkIcon as BookmarkIconMicro } from "@heroicons/react/16/solid";

import { NoData } from "src/components";

import {
  createMarkup,
  getHtmlTextLength,
  trimHTMLContent,
} from "src/utils/common";

import { BookMark } from "src/features/Home/types/bookMarkDataType";

export default function Bookmarks({
  bookMarks,
}: {
  bookMarks: Array<BookMark>;
}): ReactElement {
  const navigate = useNavigate();

  function gotoPost() {
    navigate(`/community/category-posts/replies`);
  }
  return (
    <div className="pt-40 pb-5">
      <div className="space-y-3">
        {bookMarks.length ? (
          bookMarks?.map((item) => (
            <article className="w-full space-y-3 overflow-hidden rounded-md bg-white p-3 shadow-sm">
              <div className="flex min-w-0 gap-x-2">
                <img
                  className="h-8 w-8 flex-none rounded-full bg-gray-50"
                  src={require(`src/assets/images/person-4.jpg`)}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-tight text-slate-900">
                    {item?.createdByUser}
                  </p>
                  <p className="truncate text-xs leading-tight text-slate-500">
                    {dayjs(item?.createdAt).format("MMM D, YYYY")}
                  </p>
                </div>
              </div>
              <div className="space-y-1 cursor-pointer" onClick={gotoPost}>
                <h5 className="font-semibold text-slate-900">{item?.title}</h5>
                <div className="flex gap-2">
                  {item?.tagNames?.map((tagNameItem: string) => (
                    <button className="inline-flex cursor-pointer items-center rounded-full bg-primary-50 px-2 max-w-[300px] truncate py-1 text-xs font-medium leading-tight text-primary-800 ring-1 ring-inset ring-primary-600/10 hover:bg-primary-100 hover:ring-primary-800/10">
                      {tagNameItem}
                    </button>
                  ))}
                </div>
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
                  src={require(`../../assets/images/Java.png`)}
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
                  onClick={gotoPost}
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
          ))
        ) : (
          <div className="flex items-center justify-center h-full pt-20">
            <NoData data="You haven't Bookmarked anything yet." />
          </div>
        )}
      </div>
    </div>
  );
}
