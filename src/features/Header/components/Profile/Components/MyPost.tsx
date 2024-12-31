import React, { ReactElement, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import {
  ArrowBigUp,
  MessageSquare,
  ArrowBigDown,
  Bookmark,
  Share2,
} from "lucide-react";

import { Avatar, Loading, NoData } from "src/components";

import { useGetMyPosts } from "../api/useGetMyPosts";
import { useGetUserDetails } from "src/features/Header/api/useGetUserDetails";

import {
  createMarkup,
  getHtmlTextLength,
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

  function gotoPost(id: number) {
    navigate(`/community/category-posts/replies?threadId=${id}`, {
      state: { from: window.location.pathname + window.location.search},
    });
  }

  function handleItemClick(event: React.MouseEvent, threadID: number) {
    if ((event.target as HTMLElement).closest("a")) {
      return;
    }
    gotoPost(threadID);
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
      <div className="pt-8 space-y-3 pb-7">
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
                    <Avatar userName={item.createdByUser} size="medium" />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-tight text-slate-900">
                        {item?.createdByUser}
                      </p>
                      <div className="flex">
                        <p className="truncate text-xs text-slate-500">
                          {item?.communityName}/{item?.categoryName}
                        </p>
                        <span className="text-[9px] text-slate-400 pl-2 pr-1">
                          ●
                        </span>
                        <p className="truncate text-xs text-slate-500">
                          {dayjs(item?.createdAt).format("MMM D, YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="space-y-1 cursor-pointer"
                    onClick={(event) => handleItemClick(event, item?.threadID)}
                  >
                    <h5 className="font-semibold text-slate-900">
                      {item?.title}
                    </h5>
                    <div className="flex gap-2 pb-2">
                      {item?.tagNames?.map((tagItem: string, index: number) => (
                        <button
                          key={index}
                          className="inline-flex cursor-pointer items-center rounded-full bg-primary-50 px-2 max-w-[300px] truncate py-1 text-xs font-medium leading-tight text-primary-800 ring-1 ring-inset ring-primary-600/10 hover:bg-primary-100 hover:ring-primary-800/10"
                        >
                          {tagItem}
                        </button>
                      ))}
                    </div>
                    <p className="text-slate-900 prevent-text-break-out inline">
                      <span
                        className="inline prose prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-a:text-sm"
                        id="content"
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
                    className="flex items-center space-x-3"
                    onClick={() => gotoPost(item?.threadID)}
                  >
                    <button
                      title="Up vote"
                      className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
                    >
                      <ArrowBigUp size={23} className="text-gray-600" />{" "}
                      <span className="sr-only">Up vote</span>
                      <span>{item?.upVoteCount}</span>
                    </button>
                    <button
                      title="Down vote"
                      className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
                    >
                      <ArrowBigDown size={23} className="text-gray-600" />{" "}
                      <span className="sr-only">Down vote</span>
                      <span>{item?.downVoteCount}</span>
                    </button>
                    <button
                      title="Comment"
                      className="flex items-center gap-1 rounded-full px-1.5 py-1.5 text-xs hover:bg-slate-200"
                    >
                      <MessageSquare
                        size={15}
                        className="text-gray-600"
                        strokeWidth={3}
                      />{" "}
                      <span className="sr-only">Comment</span>
                      <span>{item?.replyCount}</span>
                    </button>
                    <button
                      className="flex items-center rounded-full px-1.5 py-1.5 text-xs hover:bg-slate-200"
                      title="Bookmark"
                    >
                      <Bookmark
                        size={15}
                        className={`text-gray-600 ${
                          item?.isBookmark ? "fill-gray-600" : null
                        }`}
                        strokeWidth={3}
                      />{" "}
                      <span className="sr-only">Bookmark</span>
                    </button>
                    <button
                      title="Share"
                      className="flex items-center rounded-full px-1.5 py-1.5 text-xs hover:bg-slate-200"
                    >
                      <Share2
                        strokeWidth={3}
                        className="text-slate-600"
                        size={14}
                      />
                      <span className="sr-only">Share</span>
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
