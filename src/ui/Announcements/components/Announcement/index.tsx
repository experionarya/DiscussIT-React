import React, { ReactElement } from "react";

export default function Announcement(): ReactElement {
  return (
    <>
      <article className="w-full space-y-3 overflow-hidden rounded-md bg-white p-3 shadow-sm">
        <div className="flex justify-between mb-1">
          <h5 className="font-semibold text-slate-900">
            Hey Experionites!Hey Experionites!Hey Experionites!Hey
            Experionites!Hey Experionites!
          </h5>
          <span className="text-xs leading-tight text-slate-500 pt-1 shrink-0">
            October 15, 2024
          </span>
        </div>
        <span className="text-slate-900">
          If you are someone who is passionate about promoting sustainable
          living, then what are some environmental issues that you're
          particularly passionate about? Whether it's reducing plastic waste, or
          combating climate change, what issues are important to you and why?
        </span>
      </article>
    </>
  );
}
