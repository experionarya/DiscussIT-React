import React, { ReactElement, useState, useCallback } from "react";
import { useQuery } from "react-query";
import { BookmarkSolid } from "iconoir-react";

import { AddCategories } from "../AddCategories";
import { PreferenceList } from "./PreferenceList";
import { BookMarkPopover } from "./BookmarkPopover";

import { useGetSavedThreads } from "../../api/useGetSavedThreads";

import { useHomeStore } from "../../store/homeStore";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

export interface Data {
  category: string;
  heading: string;
  description: string;
}

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

  const { data: savedPosts } = useGetSavedThreads(userDetails?.userID);
  const { tokenType } = useAuth();

  //calling the book mark apis\
  useQuery(
    ["get_threadIDs", savedPosts],
    () => {
      savedPosts?.forEach((student) => {
        const parsedToken = getParsedToken();
        if (parsedToken && tokenType && student?.threadID)
          getBookMarkedData({
            token: parsedToken,
            tokenType: tokenType,
            threadId: student?.threadID,
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
        <aside className="min-w-40 max-w-52 space-y-5 pl-2">
          <div className="space-y-1 text-sm">
            <li className="inline-block w-full cursor-pointer rounded bg-sky-200/50 px-3 py-1 font-semibold text-primary-800 hover:bg-slate-300/50">
              All posts
            </li>
            <li className="inline-block w-full cursor-pointer rounded px-3 py-1 text-slate-700 hover:bg-slate-300/50 hover:text-slate-800">
              Popular
            </li>
          </div>
          <PreferenceList handleAddCategories={handleAddCategories} />

          <div>
            <h5 className="mb-2 flex text-lg items-center gap-1 font-semibold text-slate-900 dark:text-slate-200">
              <BookmarkSolid className="-ml-2 size-4 text-slate-400" />
              <span>Bookmarks</span>
            </h5>
            <div className="text-sm space-y-2 max-h-56 overflow-y-scroll">
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
