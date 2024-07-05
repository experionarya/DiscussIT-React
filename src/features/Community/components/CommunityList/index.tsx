import React, { ReactElement } from "react";
export default function CommunityList(): ReactElement {
  return (
    <div className="fixed">
      <div className="overflow-y-scroll">
        <aside className="min-w-40 max-w-44 space-y-8 pl-2">
          <div className="space-y-1 text-sm">
            <li className="inline-block w-full cursor-pointer rounded bg-sky-200/50 px-3 py-1 font-semibold text-primary-800 hover:bg-slate-300/50">
              PM-hub
            </li>
            <li className="inline-block w-full cursor-pointer rounded px-3 py-1 text-slate-700 hover:bg-slate-300/50 hover:text-slate-800">
              Experion Discussion
            </li>
          </div>
        </aside>
      </div>
    </div>
  )};