import React, { ReactElement, useState, useCallback } from "react";
import { BookmarkSolid } from "iconoir-react";

import Popovers from "src/components/Popovers";

import { AddCategories } from "../AddCategories";
import { PreferenceList } from "./PreferenceList";

import { useHomeStore } from "../../store/homeStore";
import { useGetBookMark } from "../../api/useGetBookMarks";

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

  const { data: bookMarksData } = useGetBookMark(userDetails?.score);

  function handleClose() {
    setIsOpen(false);
  }

  function handleAddCategories() {
    setIsOpen(true);
  }

  const data: Data[] = [
    {
      category: "Newtork security",
      heading:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit.  Nostrum, ratione!",
      description:
        "What are some best practices for handling exceptions in Java applications to ensure robust error handling and graceful degradation?",
    },
  ];

  return (
    <div className="fixed">
      <div className="overflow-y-scroll">
        <aside className="min-w-40 max-w-52 space-y-8 pl-2">
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
            <div className="text-sm space-y-2">
              <Popovers data={bookMarksData} />
              {/* <Popovers data={data} />
              <Popovers data={data} /> */}
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
