import React, { ReactElement, useState } from "react";
import CreateSpace from "../CreateSpace";
import { Popovers } from "./BookmarkPopover";
import { PinSolid, BookmarkSolid } from "iconoir-react";

export interface Data {
  category: string;
  heading: string;
  description: string;
}

export default function LeftPanel(): ReactElement {
  let [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  function handleCreateSpace() {
    setIsOpen(true);
  }

  const data: Data[] = [
    {
      category: "Newtork security",
      heading:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit.  Nostrum, ratione!",
      description:
        "What are some best practices for handling exceptions in Java applications to ensure robust error handling and graceful degradation?",
    },
  ];

  return (
    <div className="fixed">
      <div className="overflow-y-scroll">
        <aside className="min-w-40 max-w-44 space-y-8 pl-2">
          <div className="space-y-1 text-sm">
            <li className="inline-block w-full cursor-pointer rounded bg-sky-200/50 px-3 py-1 font-semibold text-primary-800 hover:bg-slate-300/50">
              All posts
            </li>
            <li className="inline-block w-full cursor-pointer rounded px-3 py-1 text-slate-700 hover:bg-slate-300/50 hover:text-slate-800">
              Popular
            </li>
          </div>
          <div>
            <h5 className="mb-2 flex items-center gap-1 font-semibold text-slate-900 dark:text-slate-200">
              <PinSolid className="-ml-2 h-4 w-4 stroke-slate-400 text-slate-400" />
              <span>Pinned topics</span>
            </h5>
            <ul className="space-y-1 text-sm">
              <li className="inline-block w-full cursor-pointer rounded px-3 py-1 text-slate-700 hover:bg-slate-300/50 hover:text-slate-800">
                Newtork security
              </li>
              <li className="inline-block w-full cursor-pointer rounded px-3 py-1 text-slate-700 hover:bg-slate-300/50 hover:text-slate-800">
                User experience
              </li>
              <li className="inline-block w-full cursor-pointer rounded px-3 py-1 text-slate-700 hover:bg-slate-300/50 hover:text-slate-800">
                Artificial intelligence
              </li>
              <li className="inline-block w-full cursor-pointer rounded px-3 py-1 text-slate-700 hover:bg-slate-300/50 hover:text-slate-800">
                MongoDB
              </li>
              <li
                className="inline-flex w-full cursor-pointer items-center gap-1 rounded px-3 py-1 text-xs font-semibold text-primary-800 underline hover:bg-sky-200/50"
                onClick={handleCreateSpace}
              >
                Add more topics
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-2 flex items-center gap-1 font-semibold text-slate-900 dark:text-slate-200">
              <BookmarkSolid className="-ml-2 size-4 text-slate-400" />
              <span>Bookmarks</span>
            </h5>
            {/* <ul className="text-sm">
              <li className="inline-block cursor-pointer w-full overflow-hidden rounded-md px-3 hover:bg-slate-300/50">
                <span className="inline-block text-xs text-slate-400">
                  Newtork security
                </span>
                <span className="inline-block w-full truncate text-sm leading-tight text-slate-700">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nostrum, ratione!
                </span>
              </li>
              <li className="inline-block w-full cursor-pointer overflow-hidden rounded-md px-3 hover:bg-slate-300/50">
                <span className="inline-block text-xs text-slate-400">
                  Newtork security
                </span>
                <span className="inline-block w-full truncate text-sm leading-tight text-slate-700">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nostrum, ratione!
                </span>
              </li>
            </ul> */}
            <div className="text-sm space-y-2">
              <Popovers data={data} />
              <Popovers data={data} />
              <Popovers data={data} />
            </div>
          </div>
        </aside>
      </div>
      {isOpen ? <CreateSpace isOpen={isOpen} close={handleClose} /> : null}
    </div>
  );
}
