import React, { ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconMicro } from "@heroicons/react/16/solid";
import { ShareIcon as ShareIconMicro } from "@heroicons/react/16/solid";
import { BookmarkIcon as BookmarkIconMicro } from "@heroicons/react/16/solid";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { useGetTrendingTagsDetails } from "./api/useGetTrendingTagsDetails";
import {
  createMarkup,
  getHtmlTextLength,
  trimHTMLContent,
} from "src/utils/common";

dayjs.extend(utc);

export default function TagsDetailPage(): ReactElement {
  const navigate = useNavigate();
  const { tagName } = useParams<{ tagName: string }>() || "";
  const appendedParam = `# ${tagName}`;
  const encodedQueryParam = encodeURIComponent(appendedParam);
  const { data: tagsDetails } = useGetTrendingTagsDetails(
    encodedQueryParam || ""
  );

  function gotoPost() {
    navigate("/community/category-posts/replies", {
      state: { from: window.location.pathname },
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-auto gap-6 pt-6 sm:px-2 lg:px-8">
      <div className="min-w-40 max-w-44" />
      <div className="grid grow grid-cols-3 gap-4">
        <div className="col-span-2 space-y-2 pl-10">
          <h1 className="font-semibold text-lg pb-3 text-slate-900">
            {appendedParam}
          </h1>
          <div className="flex gap-5">
            <div className="text-slate-500 pb-2">
              <select
                name="filter"
                id="filter"
                className="bg-slate-200 p-0.5 rounded text-xs"
              >
                <option value="Replies" className="text-xs">
                  Replies
                </option>
                <option value="Upvotes" className="text-xs">
                  Upvotes
                </option>
                <option value="Date posted" className="text-xs">
                  Date posted
                </option>
              </select>
            </div>
            <div className="text-slate-500 pb-2">
              <select
                name="sort"
                id="sort"
                className="bg-slate-200 p-0.5 rounded text-xs"
              >
                <option value="Replies" className="text-xs">
                  Most to least
                </option>
                <option value="Upvotes" className="text-xs">
                  Least to most
                </option>
              </select>
            </div>
          </div>
          <div className="space-y-3">
            {tagsDetails?.searchThreadDtoList?.map((item) => (
              <article className="w-full space-y-3 overflow-hidden rounded-md bg-white p-3 shadow-sm">
                <div className="flex min-w-0 gap-x-2">
                  <img
                    className="h-8 w-8 flex-none rounded-full bg-gray-50"
                    src={require(`../../assets/images/person-4.jpg`)}
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
                  <h5 className="font-semibold text-slate-900">
                    {item?.title}
                  </h5>
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
                    <button className="text-primary-800 underline">
                      (More)
                    </button>
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
            ))}
          </div>
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
}
