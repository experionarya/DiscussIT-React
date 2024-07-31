import React, { ReactElement } from "react";
import { PinSolid } from "iconoir-react";

import { useGetPreferenceList } from "../../api/useGetPreferenceList";

export function PreferenceList({ handleAddCategories }: any): ReactElement {
  const { data: preferenceList } = useGetPreferenceList();

  function getButtonLabel() {
    if (preferenceList?.length) return "Add more categories";
    else return "Add new categories";
  }

  return (
    <div>
      <h5 className="mb-2 flex text-lg items-center gap-1 font-semibold text-slate-900 dark:text-slate-200">
        <PinSolid className="-ml-2 h-4 w-4 stroke-slate-400 text-slate-400" />
        <span>Pinned categories</span>
      </h5>
      <ul className="space-y-1 text-sm max-h-52 overflow-y-scroll">
        {/* <li className="flex justify-between w-full items-center cursor-pointer truncate rounded px-3 py-1 text-slate-700 hover:bg-slate-300/50 hover:text-slate-800">
          Newtork security
          <span className="size-[6px] bg-red-600 rounded-full flex-shrink-0" />
        </li> */}

        {preferenceList &&
          preferenceList?.map((item: any) => (
            <li className="flex w-full cursor-pointer rounded px-3 py-1 text-slate-700 hover:bg-slate-300/50 hover:text-slate-800">
              {item?.communityCategoryName}
            </li>
          ))}
      </ul>
      <button
          className="inline-flex w-full cursor-pointer items-center gap-1 rounded px-3 py-1 text-xs font-semibold text-primary-800 underline hover:bg-sky-200/50"
          onClick={handleAddCategories}
        >
          {getButtonLabel()}
        </button>
    </div>
  );
}
