import React, { ReactElement, useState, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { BookmarkSolid } from "iconoir-react";

import { AddCategories } from "../AddCategories";
import { PreferenceList } from "./PreferenceList";
import { BookMarkPopover } from "./BookmarkPopover";

import { useGetSavedThreads, useGetAllPosts } from "../../api/index";

import { useHomeStore } from "../../store/homeStore";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

export default function LeftPanel(): ReactElement {
  let [isOpen, setIsOpen] = useState<boolean>(false);

  const userDetails = useHomeStore(
    useCallback((state: any) => state.userDetails, [])
  );

  const getBookMarkedData = useHomeStore(
    useCallback((state: any) => state.getBookMarkedData, [])
  );

  const bookMarks = useHomeStore(
    useCallback((state: any) => state.bookMarks, [])
  );

  const filterByValue = useHomeStore(
    useCallback((state) => state.filterByValue, [])
  );

  const setFilterByValue = useHomeStore(
    useCallback((state) => state.setFilterByValue, [])
  );
  const setCommunityId = useHomeStore(
    useCallback((state) => state.setCommunityId, [])
  );

  const { data: savedPosts } = useGetSavedThreads(userDetails?.userID);

  const {
    hasNextPage,
    fetchNextPage,
  } = useGetAllPosts({
    filterBy: filterByValue,
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
  const { tokenType } = useAuth();

  //calling the book mark apis\
  useQuery(
    ["get_threadIDs", savedPosts],
    () => {
      savedPosts?.forEach((savedPost) => {
        const parsedToken = getParsedToken();
        if (parsedToken && tokenType && savedPost?.threadID)
          getBookMarkedData({
            token: parsedToken,
            tokenType: tokenType,
            threadId: savedPost?.threadID,
          });
      });
    },
    { staleTime: Infinity }
  );

  function handleClose() {
    setIsOpen(false);
  }

  function handleAddCategories() {
    setIsOpen(true);
  }

  return (
    <div className="fixed">
      <div className="overflow-y-scroll">
        <aside className="min-w-40 max-w-52 space-y-4 pl-2">
          <div className="space-y-1 text-sm">
            <li
              className={`inline-block w-full cursor-pointer rounded ${
                filterByValue === "newest"
                  ? "bg-sky-200/50 font-semibold text-primary-800"
                  : null
              } px-3 py-1 hover:bg-slate-300/50`}
              onClick={() => {
                setFilterByValue("newest");
                setCommunityId(-1);
              }}
            >
              Newest
            </li>
            <li
              onClick={() => {
                setFilterByValue("popular");
                setCommunityId(-1);
              }}
              className={`inline-block w-full cursor-pointer rounded ${
                filterByValue === "popular"
                  ? "bg-sky-200/50 font-semibold text-primary-800"
                  : null
              } px-3 py-1 hover:bg-slate-300/50`}
            >
              Popular
            </li>
            <li
              onClick={() => {
                setFilterByValue("all posts");
                setCommunityId(-1);
              }}
              className={`inline-block w-full cursor-pointer rounded ${
                filterByValue === "all posts"
                  ? "bg-sky-200/50 font-semibold text-primary-800"
                  : null
              } px-3 py-1 hover:bg-slate-300/50`}
            >
              All post
            </li>
          </div>
          <PreferenceList
            handleAddCategories={handleAddCategories}
            filterByValue={filterByValue}
          />
          <div>
            <h5 className="mb-2 flex text-lg items-center gap-1 font-semibold text-slate-900 dark:text-slate-200">
              <BookmarkSolid className="-ml-2 size-4 text-slate-400" />
              <span>Bookmarks</span>
            </h5>
            <div className="text-sm space-y-2 w-full overflow-x-hidden pr-2">
              <BookMarkPopover data={bookMarks} />
            </div>
          </div>
        </aside>
      </div>
      {isOpen ? (
        <AddCategories isOpen={isOpen} handleClose={handleClose} />
      ) : null}
    </div>
  );
}
