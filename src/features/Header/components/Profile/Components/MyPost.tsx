import React, { ReactElement, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconMicro } from "@heroicons/react/16/solid";
import { ShareIcon as ShareIconMicro } from "@heroicons/react/16/solid";
import { BookmarkIcon as BookmarkIconMicro } from "@heroicons/react/16/solid";

import { Avatar, Loading, NoData } from "src/components";

import { useGetMyPosts } from "../api/useGetMyPosts";
import { useGetUserDetails } from "src/features/Header/api/useGetUserDetails";

import {
  createMarkup,
  getHtmlTextLength,
  getInitials,
  trimHTMLContent,
} from "src/utils/common";
import { ThreadType } from "src/features/Community/types/postType";

export default function MyPost(): ReactElement {
  const { data: userDetails } = useGetUserDetails();
  const [filterOption, setFilterOption] = useState<number>(0);
  const [sortOption, setSortOption] = useState<number>(0);

  const {
    data: myPosts,
    isLoading: isPostLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetMyPosts({
    userId: userDetails?.userID,
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

  const navigate = useNavigate();

  console.log("locationnnnnnnnn", window.location.pathname);

  function gotoPost(id: number) {
    console.log("location in gotopost", window.location.pathname);
    navigate(`/community/category-posts/replies?threadId=${id}`, {
      state: { from: window.location.pathname },
    });
  }

  return (
    <div className="pt-32 space-y-3">
      <div className="flex gap-5 pt-2 fixed w-[645px] bg-fill">
        <div className="text-slate-500">
          <select
            name="filter"
            id="filter"
            className="bg-slate-200 p-0.5 rounded text-xs"
            onChange={(e) => setFilterOption(parseInt(e.target.value))}
          >
            <option value="0" className="text-xs">
              Replies
            </option>
            <option value="1" className="text-xs">
              Upvotes
            </option>
            <option value="2" className="text-xs">
              Downvotes
            </option>
            <option value="3" className="text-xs">
              Date posted
            </option>
          </select>
        </div>
        {filterOption !== 3 ? (
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
                Newest
              </option>
              <option value="1" className="text-xs">
                Oldest
              </option>
            </select>
          </div>
        )}
      </div>
      <div className="pt-8 space-y-3 pb-5">
        {isPostLoading ? (
          <div className="flex justify-center items-center pt-20">
            <Loading />
          </div>
        ) : myPosts && myPosts.pages ? (
          myPosts.pages.map((page) =>
            page?.threads?.length ? (
              page.threads.map((item: ThreadType, index: number) => (
                <article
                  key={index}
                  className="w-full space-y-3 overflow-hidden rounded-md bg-white p-3 shadow-sm"
                >
                  <div className="flex min-w-0 gap-x-2">
                    <Avatar userName={getInitials(item?.createdByUser) || ""} />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-tight text-slate-900">
                        {item?.createdByUser}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {dayjs(item?.createdAt).format("MMM D, YYYY")}
                      </p>
                    </div>
                  </div>
                  <div
                    className="space-y-1 cursor-pointer"
                    onClick={() => gotoPost(item?.threadID)}
                  >
                    <h5 className="font-semibold text-slate-900">
                      {item?.title}
                    </h5>
                    <div className="flex gap-2">
                      {item?.tagNames?.map((tagItem: string, index: number) => (
                        <button
                          key={index}
                          className="inline-flex cursor-pointer items-center rounded-full bg-primary-50 px-2 max-w-[300px] truncate py-1 text-xs font-medium leading-tight text-primary-800 ring-1 ring-inset ring-primary-600/10 hover:bg-primary-100 hover:ring-primary-800/10"
                        >
                          {tagItem}
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
                  <div
                    className="flex space-x-3"
                    onClick={() => gotoPost(item?.threadID)}
                  >
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
              <NoData data="You haven't posted anything yet." />
            )
          )
        ) : (
          <NoData data="You haven't posted anything yet." />
        )}
      </div>
    </div>
  );
}
