import React, { ReactElement } from "react";
import { MedalSolid } from "iconoir-react";

import { TrophyIcon } from "@heroicons/react/16/solid";

import { useGetLeaderboard } from "../../api";
import { TopUsersType } from "../../types/topUsers";

export default function LeaderBoard(): ReactElement {
  const { data: topUsers } = useGetLeaderboard();

  function renderTopUsers(item: TopUsersType, index: number) {
    return (
      <div
        className={`flex min-w-0 items-center gap-x-2 rounded-md ${
          index < 3 ? "bg-amber-100/80" : ""
        } px-2 py-1`}
      >
        <img
          className={`h-6 w-6 flex-none rounded-full bg-gray-50  ${
            index < 3 ? "ring-2 ring-amber-500" : ""
          }`}
          src={require(`src/assets/images/person-1.jpg`)}
          alt="person"
        />
        <div className="min-w-0 flex-auto">
          <p
            className={`text-xs font-semibold leading-tight ${
              index < 3 ? "text-amber-900" : "text-slate-900"
            }`}
          >
            {item?.name}
          </p>
          <p
            className={`truncate text-xs leading-tight ${
              index < 3 ? "text-amber-700/80" : "text-slate-500"
            }`}
          >
            {item?.score} points
          </p>
        </div>
        <MedalSolid
          className={`h-6 w-6 ${
            index < 3 ? "text-amber-500" : "text-slate-400"
          }`}
        />
      </div>
    );
  }
  return (
    <div>
      <section className="max-w-full rounded-md bg-white shadow-sm mt-3">
        <div className="p-2">
          <h3 className="flex items-center gap-1 font-semibold text-slate-900">
            <TrophyIcon className="size-4 text-slate-400" />
            Leaderboard
          </h3>
        </div>
        <div className="space-y-2 p-2 max-h-64 overflow-y-scroll">
          {topUsers &&
            topUsers?.map((item: TopUsersType, index: number) =>
              renderTopUsers(item, index)
            )}

          {/* <div className="flex min-w-0 items-center gap-x-2 rounded-md bg-amber-100/80 px-2 py-1">
            <img
              className="h-6 w-6 flex-none rounded-full bg-gray-50 ring-2 ring-amber-500"
              src={require(`src/assets/images/person-2.jpg`)}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-xs font-semibold leading-tight text-amber-900">
                Leslie Alexander
              </p>
              <p className="truncate text-xs leading-tight text-amber-700/80">
                112 Posts
              </p>
            </div>
            <MedalSolid className="h-6 w-6 text-amber-500" />
          </div>
          <div className="flex min-w-0 items-center gap-x-2 rounded-md px-2 py-1">
            <img
              className="h-6 w-6 flex-none rounded-full bg-gray-50"
              src={require(`src/assets/images/person-3.jpg`)}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-xs font-semibold leading-tight text-slate-900">
                Courtney Henry
              </p>
              <p className="truncate text-xs leading-tight text-slate-500">
                98 Posts
              </p>
            </div>
            <MedalSolid className="h-6 w-6 text-slate-400" />
          </div>
          <div className="flex min-w-0 items-center gap-x-2 rounded-md px-2 py-1">
            <img
              className="h-6 w-6 flex-none rounded-full bg-gray-50"
              src={require(`src/assets/images/person-4.jpg`)}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-xs font-semibold leading-tight text-slate-900">
                Lindsay Walton
              </p>
              <p className="truncate text-xs leading-tight text-slate-500">
                72 Posts
              </p>
            </div>
            <MedalSolid className="h-6 w-6 text-slate-400" />
          </div>
          <div className="flex min-w-0 items-center gap-x-2 rounded-md px-2 py-1">
            <img
              className="h-6 w-6 flex-none rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-xs font-semibold leading-tight text-slate-900">
                Dries Vincent
              </p>
              <p className="truncate text-xs leading-tight text-slate-500">
                44 Posts
              </p>
            </div>
            <MedalSolid className="h-6 w-6 text-slate-400" />
          </div> */}
        </div>
      </section>
    </div>
  );
}
