import { HashtagIcon } from "@heroicons/react/24/outline";
import React, { ReactElement } from "react";
import Tag from "src/components/Tag/intex";

export default function TrendingTags(): ReactElement {
  const tagArray = [
    "Webpack",
    "D3.js",
    "Amazon Web Services",
    "JIRA",
    "Kubernetes",
    "Async/Await",
    "RESTful APIs",
    "Talent Acquisition",
    "AI",
    "Workplace Culture",
    "Basecamp",
    "Budgeting",
    "API Management",
    "Leadership DevelopmentLeadership DevelopmentLeadership DevelopmentLeadership Development",
    "Project Scheduling",
    "Agile Methodology",
  ];
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
          <Tag tagArray={tagArray}/>
        </div>
      </section>
    </div>
  );
}
