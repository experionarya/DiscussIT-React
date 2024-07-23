import React, { ReactElement } from "react";
import { DoubleCheck } from "iconoir-react";

export default function Notifications(): ReactElement {
  return (
    <div className="mt-16 mx-auto flex w-full max-w-7xl flex-auto gap-16 pt-6 sm:px-2 lg:px-8">
      <div className="min-w-40 max-w-44" />
      <div className="grid grow grid-cols-3">
        <div className="col-span-2">
            <h1 className="font-semibold text-slate-900 text-lg">
              Notifications
            </h1>
            <div className="flex justify-between mt-2 mb-3 border-b border-slate-200 pb-3">
              <ul className="flex gap-3 text-sm text-slate-700 font-medium">
                <li className="flex-shrink-0 flex items-center leading-none px-2 py-1 border bg-slate-300 border-stroke-weak hover:bg-slate-200 rounded-full cursor-pointer">
                  All
                </li>
                <li className="flex items-center flex-shrink-0 leading-none px-2 py-1 border border-stroke-weak hover:bg-slate-200 rounded-full cursor-pointer">
                  Unread
                </li>
              </ul>
              <button className="text-xs text-primary-800 flex font-semibold">
                <DoubleCheck className="size-4 mr-1" />
                <span>Mark all as read</span>
              </button>
            </div>
          <div className="space-y-3 max-h-full">
            <article className="px-4 pt-3 pb-4 bg-white rounded-md shadow-sm ">
              <div className="flex justify-between mb-1 items-start">
                <p className="text-slate-900 leading-tight">
                  <span className="font-semibold leading-tight">Anu Das</span>{" "}
                  <span className="text-sm leading-tight text-slate-500">
                    replied on your comment
                  </span>
                </p>
                <div className="size-2 bg-red-600 rounded-full flex-shrink-0" />
              </div>
              <span className="truncate text-xs  text-slate-500 block mt-1">
                9:20 AM
              </span>
              <div className="bg-slate-100 rounded-md ml-5 mt-3 space-y-3 px-3 py-2">
                <div>
                  <p className="text-slate-600 text-xs flex gap-1">
                    <span>Your comment:</span>
                  </p>
                  <p className="text-sm text-slate-900 truncate">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Possimus, accusantium!
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-xs flex gap-1">
                    <span>Shubha's reply:</span>
                  </p>
                  <p className="text-sm text-slate-900 line-clamp-2 font-medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Optio, officia facilis. Ipsum quas laborum at praesentium
                    numquam tempore aliquam, hic ipsam architecto mollitia
                    consequuntur iusto vitae quam ea corporis asperiores?
                  </p>
                </div>
              </div>
            </article>
            <article className="px-4 pt-3 pb-4 bg-white rounded-md shadow-sm ">
              <div className="flex justify-between mb-1 items-start">
                <p className="text-slate-900 leading-tight">
                  <span className="font-semibold leading-tight">Anu Das</span>{" "}
                  <span className="text-sm leading-tight text-slate-500">
                    replied on your comment
                  </span>
                </p>
                <div className="size-2 bg-slate-100 rounded-full flex-shrink-0" />
              </div>
              <span className="truncate text-xs  text-slate-500 block mt-1">
                Tue 9:00 AM
              </span>
              <div className="bg-slate-100 rounded-md ml-5 mt-3 space-y-3 px-3 py-2">
                <div>
                  <p className="text-slate-600 text-xs flex gap-1">
                    <span>Your comment:</span>
                  </p>
                  <p className="text-sm text-slate-900 truncate">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Possimus, accusantium!
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-xs flex gap-1">
                    <span>Shubha's reply:</span>
                  </p>
                  <p className="text-sm text-slate-900 line-clamp-2 font-medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Optio, officia facilis. Ipsum quas laborum at praesentium
                    numquam tempore aliquam, hic ipsam architecto mollitia
                    consequuntur iusto vitae quam ea corporis asperiores?
                  </p>
                </div>
              </div>
            </article>
            <article className="px-4 pt-3 pb-4 bg-white rounded-md shadow-sm ">
              <div className="flex justify-between mb-1 items-start">
                <p className="text-slate-900 leading-tight">
                  <span className="font-semibold leading-tight">Anu Das</span>{" "}
                  <span className="text-sm leading-tight text-slate-500">
                    replied on your comment
                  </span>
                </p>
                <div className="size-2 bg-slate-100 rounded-full flex-shrink-0" />
              </div>
              <span className="truncate text-xs  text-slate-500 block mt-1">
                Tue 9:00 AM
              </span>
              <div className="bg-slate-100 rounded-md ml-5 mt-3 space-y-3 px-3 py-2">
                <div>
                  <p className="text-slate-600 text-xs flex gap-1">
                    <span>Your comment:</span>
                  </p>
                  <p className="text-sm text-slate-900 truncate">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Possimus, accusantium!
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-xs flex gap-1">
                    <span>Shubha's reply:</span>
                  </p>
                  <p className="text-sm text-slate-900 line-clamp-2 font-medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Optio, officia facilis. Ipsum quas laborum at praesentium
                    numquam tempore aliquam, hic ipsam architecto mollitia
                    consequuntur iusto vitae quam ea corporis asperiores?
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
}
