import React, { ReactElement } from "react";
import { MedalSolid } from "iconoir-react";

import { TrophyIcon } from "@heroicons/react/16/solid";

import { useHomeStore } from "../../store/homeStore";

import { TopUsersType } from "../../types/topUsers";

export default function LeaderBoard(): ReactElement {
  const topUsers = useHomeStore(
    React.useCallback((state: any) => state.topUsers, [])
  );

  function renderTopUsers(item: TopUsersType, index: number) {
    return (
      <div
        key={index}
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
    <>
      <section className="max-w-full rounded-md bg-white shadow-sm mt-3">
        <div className="p-3">
          <h3 className="flex items-center text-lg gap-1 font-semibold text-slate-900">
            <TrophyIcon className="size-4 text-slate-400" />
            Leaderboard
          </h3>
        </div>
        <div className="space-y-2 pl-3 pr-2 max-h-56 overflow-y-scroll">
          {topUsers &&
            topUsers?.map((item: TopUsersType, index: number) =>
              renderTopUsers(item, index)
            )}
        </div>
      </section>
    </>
  );
}
