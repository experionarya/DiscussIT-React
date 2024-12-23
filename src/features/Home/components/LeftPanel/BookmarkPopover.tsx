import React, { ReactElement, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ArrowBigUp, MessageSquare, ArrowBigDown } from "lucide-react";

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

  function goToPost(threadID: number) {
    navigate(`/community/category-posts/replies?threadId=${threadID}`);
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

  const limitedData = useMemo(() => data.slice(0, 3), [data]);

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-sm text-slate-500 p-3">
        You haven't bookmarked anything yet.
      </div>
    );
  }

  
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
                onClick={() => goToPost(item.threadID)}
              >
                <span className="flex text-xs text-slate-400 justify-start truncate">
                  {item?.categoryName}
                </span>
                <span className="flex items-start w-full truncate text-sm leading-tight text-slate-700">
                  {item?.title}
                </span>
              </PopoverButton>
              {hoverIndex === index && (
                <PopoverPanel
                  modal
                  static
                  anchor="top start"
                  className="w-60 divide-y -ml-5 divide-white/5 rounded-md bg-white shadow-lg text-sm/6 ease-in-out cursor-pointer"
                  onClick={() => goToPost(item.threadID)}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <div className="p-3 overflow-x-hidden">
                    <span className="inline-block text-sm text-slate-900 font-semibold truncate">
                      {item.title}
                    </span>
                    <span
                      className="inline-block w-full text-xs leading-tight max-h-10 text-slate-700 truncate"
                      dangerouslySetInnerHTML={createMarkup(
                        item?.content || ""
                      )}
                    ></span>
                    <div className="flex space-x-3">
                      <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                        <ArrowBigUp size={23} className="text-gray-600" />{" "}
                        <span className="sr-only">Up vote</span>
                        <span>{item?.upVoteCount}</span>
                      </button>
                      <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                        <ArrowBigDown size={23} className="text-gray-600" />{" "}
                        <span className="sr-only">Down vote</span>
                        <span>{item?.downVoteCount}</span>
                      </button>
                      <button className="flex items-center gap-1 rounded-full px-1 py-1.5 text-xs hover:bg-slate-200">
                        <MessageSquare
                          size={15}
                          className="text-gray-600"
                          strokeWidth={3}
                        />{" "}
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
      {data.length > 3 ? (
        <button
          className="inline-flex w-full cursor-pointer items-center gap-1 rounded px-3 py-1 text-xs font-semibold text-primary-800 underline hover:bg-sky-200/50"
          onClick={goToBookmarks}
        >
          View all bookmarks
        </button>
      ) : null}
    </>
  );
}
