import React, { ReactElement, useState } from "react";
import { Data } from "src/features/Home/components/LeftPanel/index";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconMicro } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

interface PopoversProps {
  data: any;
}

export default function Popovers({ data }: PopoversProps): ReactElement {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  function goToHome() {
    navigate(`/community/category-posts/replies`);
  }

  return (
    <div>
      {/* {data.map((item, index) => ( */}
      <Popover>
        {/* {({ open }) => ( */}
        <>
          <PopoverButton
            className="inline-block cursor-pointer w-full overflow-hidden rounded-md px-3 hover:bg-slate-300/50"
            onMouseEnter={() => setHoverIndex(data?.threadId)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={goToHome}
          >
            <span className="flex text-xs text-slate-400 justify-start">
              {data?.categoryName}
            </span>
            <span className="inline-block w-full truncate text-sm leading-tight text-slate-700">
              {data?.title}
            </span>
          </PopoverButton>
          {hoverIndex === data?.threadId && (
            <PopoverPanel
              static
              className="absolute z-10 divide-y -mt-40 -ml-10 max-w-64 divide-white/5 rounded-md bg-white shadow-lg text-sm/6 ease-in-out cursor-pointer"
              onClick={goToHome}
            >
              <div className="p-2">
                <span className="inline-block text-sm text-slate-900 font-semibold">
                  {data?.title}
                </span>
                <span className="inline-block w-full truncate text-xs leading-tight text-slate-700">
                  {data?.content}
                </span>
                <div className="flex space-x-3">
                  <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                    <ArrowUpIconMicro className="size-4 text-gray-600" />
                    <span className="sr-only">Up vote</span>
                    <span>{data?.upVoteCount}</span>
                  </button>
                  <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                    <ArrowDownIconMicro className="size-4 text-gray-600" />
                    <span className="sr-only">Down vote</span>
                    <span>{data?.downVoteCount}</span>
                  </button>
                  <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                    <ChatBubbleOvalLeftIconMicro className="size-4 text-gray-600" />
                    <span className="sr-only">Comment</span>
                    <span>{data?.replyCount}</span>
                  </button>
                </div>
              </div>
            </PopoverPanel>
          )}
        </>
        {/* )} */}
      </Popover>
      {/* ))} */}
    </div>
  );
}
