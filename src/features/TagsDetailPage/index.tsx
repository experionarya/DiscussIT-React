import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconMicro } from "@heroicons/react/16/solid";
import { ShareIcon as ShareIconMicro } from "@heroicons/react/16/solid";
import { BookmarkIcon as BookmarkIconMicro } from "@heroicons/react/16/solid";

import { Avatar, Loading, NoData } from "src/components";

import { useGetTrendingTagsDetails } from "./api/useGetTrendingTagsDetails";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";


import {
  createMarkup,
  getHtmlTextLength,
  trimHTMLContent,
} from "src/utils/common";
import { ThreadType } from "../Community/types/postType";

dayjs.extend(utc);

export default function TagsDetailPage(): ReactElement {
  const [filterOption, setFilterOption] = useState<number>(0);
  const [sortOption, setSortOption] = useState<number>(0);

  const navigate = useNavigate();
  const { tagName } = useParams<{ tagName: string }>() || "";
  const appendedParam = `# ${tagName}`;
  const encodedQueryParam = encodeURIComponent(appendedParam);

  const {
    data: tagsDetails,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetTrendingTagsDetails({
    tagName: encodedQueryParam || "",
    filterOption,
    sortOption,
  });

  const handleScroll = useCallback(
    (e: any) => {
      const bottom =
        e?.target?.documentElement?.clientHeight - 10 <
          e?.target?.documentElement?.scrollHeight -
            e?.target?.documentElement?.scrollTop &&
        e?.target?.documentElement?.scrollHeight -
          e?.target?.documentElement?.scrollTop <
          e?.target?.documentElement?.clientHeight + 10;

      if (bottom) {
        hasNextPage && fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  function gotoPost(id: number) {
    navigate(`/community/category-posts/replies?threadId=${id}`, {
      state: { from: window.location.pathname },
    });
  }

  function handleItemClick(event: React.MouseEvent, threadID: number) {
    if ((event.target as HTMLElement).closest("a")) {
      return;
    }
    gotoPost(threadID);
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-auto gap-6 sm:px-2 lg:px-8">
       <div className="min-w-40 max-w-44">
        <div className="min-w-40 max-w-44 space-y-5 flex justify-end ml-9 mt-5">
          <button
            className="fixed size-10 border border-stroke-stong/50 text-slate-700 bg-white rounded-full flex justify-center items-center"
            onClick={() => {
              navigate("/home");
            }}
          >
            <ArrowLeftIcon className="size-5" />
          </button>
        </div>
      </div>
      <div className="grid grow grid-cols-3 gap-4">
        <div className="col-span-2 space-y-2 pl-10">
          <div className="fixed w-[645px] bg-fill pt-6">
            <h1 className="font-semibold text-lg pb-3 text-slate-900">
              {appendedParam}
            </h1>
            <div className="flex gap-5">
              <div className="text-slate-500 pb-2">
                <select
                  name="filter"
                  id="filter"
                  className="bg-slate-200 p-0.5 rounded text-xs"
                  value={filterOption}
                  onChange={(e) => setFilterOption(Number(e.target.value))}
                >
                  <option value="0" className="text-xs">
                    Replies
                  </option>
                  <option value="1" className="text-xs">
                    Upvotes
                  </option>
                  <option value="2" className="text-xs">
                    Date posted
                  </option>
                </select>
              </div>
              {filterOption !== 2 ? (
                <div className="text-slate-500 pb-2">
                  <select
                    name="sort"
                    id="sort"
                    className="bg-slate-200 p-0.5 rounded text-xs"
                    onChange={(e) => setSortOption(parseInt(e.target.value))}
                  >
                    <option value="0" className="text-xs">
                      Most to least
                    </option>
                    <option value="1" className="text-xs">
                      Least to most
                    </option>
                  </select>
                </div>
              ) : (
                <div className="text-slate-500 pb-2">
                  <select
                    name="sort"
                    id="sort"
                    className="bg-slate-200 p-0.5 rounded text-xs"
                    onChange={(e) => setSortOption(parseInt(e.target.value))}
                  >
                    <option value="0" className="text-xs">
                      Oldest
                    </option>
                    <option value="1" className="text-xs">
                      Newest
                    </option>
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-3 pb-7 pt-24">
            {isLoading ? (
              <div className="flex justify-center items-center pt-20">
                <Loading />
              </div>
            ) : tagsDetails?.pages?.length ? (
              tagsDetails.pages.map((page) =>
                page.searchThreadDtoList.map((item: ThreadType) => (
                  <article
                    key={item.threadID}
                    className="w-full space-y-3 overflow-hidden rounded-md bg-white p-3 shadow-sm"
                  >
                    <div className="flex min-w-0 gap-x-2">
                      <Avatar userName={item.createdByUser} size="medium" />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-tight text-slate-900">
                          {item.createdByUser}
                        </p>
                        <p className="truncate text-xs leading-tight text-slate-500">
                          {dayjs(item.createdAt).format("MMM D, YYYY")}
                        </p>
                      </div>
                    </div>
                    <div
                      className="space-y-1 cursor-pointer"
                      onClick={(event) =>
                        handleItemClick(event, item?.threadID)
                      }
                    >
                      <h5 className="font-semibold text-slate-900">
                        {item.title}
                      </h5>
                      <div className="flex gap-2 pb-2">
                        {item.tagNames?.map((tagNameItem: string) => (
                          <button
                            key={tagNameItem}
                            className="inline-flex cursor-pointer items-center rounded-full bg-primary-50 px-2 max-w-[300px] truncate py-1 text-xs font-medium leading-tight text-primary-800 ring-1 ring-inset ring-primary-600/10 hover:bg-primary-100 hover:ring-primary-800/10"
                          >
                            {tagNameItem}
                          </button>
                        ))}
                      </div>
                      <p className="text-slate-900 prevent-text-break-out inline">
                        <span
                          className="inline prose prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-a:text-sm"
                          dangerouslySetInnerHTML={createMarkup(
                            trimHTMLContent(item?.content)
                          )}
                        />
                        {getHtmlTextLength(item?.content) > 150 && (
                          <button className="text-primary-800 underline inline">
                            (More)
                          </button>
                        )}
                      </p>
                    </div>
                    <div
                      className="flex space-x-3"
                      onClick={() => gotoPost(item.threadID)}
                    >
                      <button
                        title="Up vote"
                        className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
                      >
                        <ArrowUpIconMicro className="size-4 text-gray-600" />
                        <span className="sr-only">Up vote</span>
                        <span>{item.upVoteCount}</span>
                      </button>
                      <button
                        title="Down vote"
                        className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
                      >
                        <ArrowDownIconMicro className="size-4 text-gray-600" />
                        <span className="sr-only">Down vote</span>
                        <span>{item.downVoteCount}</span>
                      </button>
                      <button
                        title="Comment"
                        className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
                      >
                        <ChatBubbleOvalLeftIconMicro className="size-4 text-gray-600" />
                        <span className="sr-only">Comment</span>
                        <span>{item.replyCount}</span>
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
              )
            ) : (
              <div className="pt-36">
                <NoData data="No Posts Yet. Be the First one to post." />
              </div>
            )}
          </div>
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
}
