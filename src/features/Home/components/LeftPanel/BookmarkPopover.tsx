import React, { ReactElement, useState, useRef } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconMicro } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

import { BookMark } from "../../types/bookMarkDataType";
import { createMarkup } from "src/utils/common";

export function BookMarkPopover({
  data,
}: {
  data: Array<BookMark>;
}): ReactElement {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const hoverDelay = 400; // Delay in milliseconds

  function goToPost() {
    navigate(`/community/category-posts/replies`);
  }

  const handleMouseEnter = (index: number) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoverIndex(index);
    }, hoverDelay);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoverIndex(null);
  };

  function goToBookmarks() {
    navigate("/profile?section=bookmarks");
  }

  const limitedData = data.slice(0, 3);

  return (
    <>
      {limitedData?.map((item, index) => (
        <Popover key={index}>
          {({ open }) => (
            <>
              <PopoverButton
                className="inline-block cursor-pointer w-full overflow-hidden rounded-md px-3 hover:bg-slate-300/50"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={goToPost}
              >
                <span className="flex text-xs text-slate-400 justify-start truncate">
                  {item?.categoryName}
                </span>
                <span className="inline-block w-full truncate text-sm leading-tight text-slate-700">
                  {item?.title}
                </span>
              </PopoverButton>
              {hoverIndex === index && (
                <PopoverPanel
                  modal
                  static
                  anchor="top start"
                  className="w-60 divide-y -ml-5 divide-white/5 rounded-md bg-white shadow-lg text-sm/6 ease-in-out cursor-pointer"
                  onClick={goToPost}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <div className="p-3 overflow-x-hidden">
                    <span className="inline-block text-sm text-slate-900 font-semibold truncate">
                      {item.title}
                    </span>
                    <span
                      className="inline-block w-full text-xs leading-tight text-slate-700 truncate"
                      dangerouslySetInnerHTML={createMarkup(
                        item?.content || ""
                      )}
                    ></span>
                    <div className="flex space-x-3">
                      <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                        <ArrowUpIconMicro className="size-4 text-gray-600" />
                        <span className="sr-only">Up vote</span>
                        <span>{item?.upVoteCount}</span>
                      </button>
                      <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                        <ArrowDownIconMicro className="size-4 text-gray-600" />
                        <span className="sr-only">Down vote</span>
                        <span>{item?.downVoteCount}</span>
                      </button>
                      <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                        <ChatBubbleOvalLeftIconMicro className="size-4 text-gray-600" />
                        <span className="sr-only">Comment</span>
                        <span>{item?.replyCount}</span>
                      </button>
                    </div>
                  </div>
                </PopoverPanel>
              )}
            </>
          )}
        </Popover>
      ))}
      {data.length > 3 ? <button
        className="inline-flex w-full cursor-pointer items-center gap-1 rounded px-3 py-1 text-xs font-semibold text-primary-800 underline hover:bg-sky-200/50"
        onClick={goToBookmarks}
      >
        View all bookmarks
      </button> : null}
    </>
  );
}
