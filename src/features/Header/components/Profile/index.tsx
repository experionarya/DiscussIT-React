import React, { ReactElement } from "react";
// import NoData from "src/components/NoData";
import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconMicro } from "@heroicons/react/16/solid";
import { ShareIcon as ShareIconMicro } from "@heroicons/react/16/solid";
import { BookmarkIcon as BookmarkIconMicro } from "@heroicons/react/16/solid";

export default function Profile(): ReactElement {
  return (
    <div className="mt-16 mx-auto flex w-full max-w-7xl flex-auto gap-6 pt-6 sm:px-2 lg:px-8">
      <div className="min-w-40 max-w-44 space-y-5" />
      <div className="grid grow grid-cols-3 gap-4">
        <div className="col-span-2 pl-10">
          <div className="flex gap-4 items-center pb-5">
            <img
              className="size-[66px] rounded-full"
              src={require(`src/assets/images/person-2.jpg`)}
              alt="person"
            />
            <div>
              <p className="text-lg font-semibold">Arjun Krishnadas Pillai</p>
              <div className="flex items-center">
                <p className="text-xs text-slate-500 pr-2">Software Engineer</p>
                <span className="text-[9px] text-slate-500 pr-1">●</span>
                <p className="text-xs text-slate-500">DU6</p>
              </div>
              <p className="text-xs font-semibold">Points: 145</p>
            </div>
          </div>
          <div className="border-b border-slate-300">
            <ul className="flex flex-nowrap gap-4 items-center w-full pb-3">
              <li className="text-sm flex-shrink-0 font-medium flex items-center leading-none px-5 py-2 border border-stroke-weak hover:bg-slate-200 rounded-full cursor-pointer bg-slate-300">
                My Post
              </li>
              <li className="text-sm flex-shrink-0 font-medium flex items-center leading-none px-5 py-2 border border-stroke-weak hover:bg-slate-200 rounded-full cursor-pointer">
                Drafts
              </li>
              <li className="text-sm flex-shrink-0 font-medium flex items-center leading-none px-5 py-2 border border-stroke-weak hover:bg-slate-200 rounded-full cursor-pointer">
                Upvoted
              </li>
              <li className="text-sm flex-shrink-0 font-medium flex items-center leading-none px-5 py-2 border border-stroke-weak hover:bg-slate-200 rounded-full cursor-pointer">
                Downvoted
              </li>
            </ul>
            <div className="text-slate-500 pb-2">
              <select name="sort" id="sort" className="bg-fill text-xs">
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
          </div>
          {/* <div className="flex items-center justify-center h-full">
                <NoData data="You haven't posted anything yet."/>
              </div> */}
          <div className="pt-3">
            <article className="w-full space-y-3 overflow-hidden rounded-md bg-white p-3 shadow-sm">
              <div className="flex min-w-0 gap-x-2">
                <img
                  className="h-8 w-8 flex-none rounded-full bg-gray-50"
                  src={require(`../../../../assets/images/person-4.jpg`)}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-tight text-slate-900">
                    Subha Lakshmi
                  </p>
                  <p className="truncate text-xs leading-tight text-slate-500">
                    October 15, 2024
                  </p>
                </div>
              </div>
              <div className="space-y-1 cursor-pointer">
                <h5 className="font-bold text-slate-900">
                  How to handle exceptions in Java?
                </h5>
                <button className="inline-flex cursor-pointer items-center rounded-full bg-primary-50 px-2 max-w-[300px] truncate py-1 text-xs font-medium leading-tight text-primary-800 ring-1 ring-inset ring-primary-600/10 hover:bg-primary-100 hover:ring-primary-800/10">
                  Java
                </button>
                <p className="text-slate-900">
                  What are some best practices for handling exceptions in Java
                  applications to ensure robust error handling and graceful
                  degradation?
                  <button className="text-primary-800 underline">(More)</button>
                </p>
              </div>
              <img
                src={require(`../../../../assets/images/Java.png`)}
                alt="java"
                className="cursor-pointer"
                // onClick={gotoPost}
              />
              <div className="flex space-x-3">
                <button
                  title="Up vote"
                  className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
                >
                  <ArrowUpIconMicro className="size-4 text-gray-600" />
                  <span className="sr-only">Up vote</span>
                  <span>20</span>
                </button>
                <button
                  title="Down vote"
                  className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
                >
                  <ArrowDownIconMicro className="size-4 text-gray-600" />
                  <span className="sr-only">Down vote</span>
                  <span>3</span>
                </button>
                <button
                  title="Comment"
                  className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
                  // onClick={gotoPost}
                >
                  <ChatBubbleOvalLeftIconMicro className="size-4 text-gray-600" />
                  <span className="sr-only">Comment</span>
                  <span>10</span>
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
          </div>
        </div>
        <div className="col-span-1 space-y-2 overflow-y-auto" />
      </div>
    </div>
  );
}