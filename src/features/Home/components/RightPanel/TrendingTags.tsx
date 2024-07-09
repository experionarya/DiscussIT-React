import React, { ReactElement } from "react";
import { HashtagIcon } from "@heroicons/react/24/outline";

import { useGetTrendingTags } from "../../api/useGetTrendingTags";

import { TrendingTagType } from "../../types/trendingTags";

export default function TrendingTags(): ReactElement {
  const { data: trendingTags } = useGetTrendingTags();

  function renderTags(item: TrendingTagType) {
    return (
      <div>
        <span
          key={item?.tagId}
          className="inline-flex cursor-pointer items-center m-1 rounded-full bg-primary-50 px-2 max-w-[300px] truncate py-1 text-xs font-medium leading-tight text-primary-800 ring-1 ring-inset ring-primary-600/10 hover:bg-primary-100 hover:ring-primary-800/10"
        >
          {item?.tagName}
          <span className="text-xs ml-2 text-primary-500">
            ({item?.tagCount} posts)
          </span>
        </span>
      </div>
    );
  }
  return (
    <div className="w-[335px] ">
      <section className="rounded-md bg-white shadow-sm">
        <div className="p-2 pb-1">
          <h3 className="flex items-center gap-1 font-semibold text-slate-900">
            <HashtagIcon className="size-4 text-slate-400" />
            Trending tags
          </h3>
        </div>
        <div className="flex flex-wrap gap-2 p-2 max-h-64 overflow-y-scroll">
          {trendingTags?.map((item: TrendingTagType) => renderTags(item))}
        </div>
      </section>
    </div>
  );
}
