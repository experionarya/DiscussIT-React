import React, { ReactElement } from "react";
import { HashtagIcon } from "@heroicons/react/24/outline";

import { useHomeStore } from "../../store/homeStore";

import { TrendingTagType } from "../../types/trendingTags";

import { useNavigate } from "react-router-dom";

export default function TrendingTags(): ReactElement {
  const trendingTags = useHomeStore(
    React.useCallback((state: any) => state.trendingTags, [])
  );
  const navigate = useNavigate();

  function goToTagsDetailPage() {
    navigate(`/tags-deatil-page`);
  }

  function renderTags(item: TrendingTagType) {
    return (
      <div key={item?.tagId}>
        <span
          key={item?.tagId}
          className="inline-flex cursor-pointer items-center m-1 rounded-full bg-primary-50 px-2 max-w-[300px] truncate py-1 text-xs font-medium leading-tight text-primary-800 ring-1 ring-inset ring-primary-600/10 hover:bg-primary-100 hover:ring-primary-800/10"
          onClick={goToTagsDetailPage}
        >
          {item?.tagName}
          <span className="text-xs ml-2">({item?.tagCount})</span>
        </span>
      </div>
    );
  }
  return (
    <div className="w-[335px] ">
      <section className="rounded-md bg-white shadow-sm">
        <div className="p-3">
          <h3 className="flex items-center gap-1 text-lg font-semibold text-slate-900">
            <HashtagIcon className="size-4 text-slate-400" />
            Trending tags
          </h3>
        </div>
        <div className="flex flex-wrap pl-2 max-h-56 overflow-y-scroll">
          {trendingTags &&
            trendingTags?.map((item: TrendingTagType) => renderTags(item))}
        </div>
      </section>
    </div>
  );
}
