import React, { ReactElement } from "react";

import { useGetCommunityList } from "src/features/Community/api/useGetCommunityList";

export default function CommunityList(): ReactElement {
  const { data: communityList } = useGetCommunityList();
  return (
    <div className="fixed">
      <div className="max-h-full overflow-y-scroll">
        <aside className="min-w-40 max-w-44 space-y-8 pl-2 pr-2">
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
  );
}
