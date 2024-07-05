import { HashtagIcon } from "@heroicons/react/24/outline";
import React, { ReactElement } from "react";
import Tag from "src/components/Tag/intex";

export default function TrendingTags(): ReactElement {
  const tagArray = [
    "Webpack",
    "Amazon Web Services",
    "Kubernetes",
    "API Management",
    "D3.js",
    "Async/Await",
    "RESTful APIs",
    "Talent Acquisition",
    "JIRA",
    "Workplace Culture",
    "Leadership DevelopmentLeadership DevelopmentLeadership DevelopmentLeadership Development",
    "Budgeting",
    "Project Scheduling",
    "Agile Methodology",
    "AI",
    "Basecamp",
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
