import React, { ReactElement, useState } from "react";
import { Data } from "src/features/Home/components/LeftPanel/index";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

interface PopoversProps {
  data: Data[];
}

export default function Popovers({ data }: PopoversProps): ReactElement {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div>
      {data.map((item, index) => (
        <Popover key={index}>
          {({ open }) => (
            <>
              <PopoverButton
                className="inline-block cursor-pointer w-full overflow-hidden rounded-md px-3 hover:bg-slate-300/50"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <span className="flex text-xs text-slate-400 justify-start">
                  {item.category}
                </span>
                <span className="inline-block w-full truncate text-sm leading-tight text-slate-700">
                  {item.heading}
                </span>
              </PopoverButton>
              {hoverIndex === index && (
                <PopoverPanel
                  static
                  className="mt-1 max-w-52 divide-white/5 rounded-md bg-slate-200 shadow-md text-sm/6 transition duration-200 ease-in-out left-full"
                  // className="absolute z-10 -mt-10 divide-y max-w-52 divide-white/5 rounded-md bg-slate-200 shadow-md text-sm/6 transition duration-200 ease-in-out left-full ml-2 "
                >
                  <div className="p-3">
                    <span className="inline-block text-sm text-slate-900 font-semibold">
                      {item.heading}
                    </span>
                    <span className="inline-block w-full truncate text-xs leading-tight text-slate-700">
                      {item.description}
                    </span>
                  </div>
                </PopoverPanel>
              )}
            </>
          )}
        </Popover>
      ))}
    </div>
  );
}
