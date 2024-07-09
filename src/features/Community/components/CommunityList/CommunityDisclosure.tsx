import React, { ReactElement } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { CommunityType } from "../../types/communityType";

type DisclosureType = {
  communityList: Array<CommunityType> | undefined;
};

export function CommunityDisclosure({
  communityList,
}: DisclosureType): ReactElement {
  return (
    <div className="space-y-3 text-sm">
      {communityList &&
        communityList.map((item: CommunityType) => (
          <Disclosure as="div" key={item?.communityID} defaultOpen={false}>
            {({ open }) => (
              <div>
                <DisclosureButton
                  className={
                    open
                      ? "group flex w-full rounded items-center justify-between truncate font-semibold"
                      : "group flex w-full rounded font-semibold items-center justify-between hover:bg-slate-300/25 truncate"
                  }
                >
                  <div
                    className={
                      open
                        ? "cursor-pointer px-3 py-1"
                        : "cursor-pointer rounded px-3 py-1 text-slate-700 hover:text-slate-800 truncate"
                    }
                  >
                    {item.communityName}
                  </div>
                  <ChevronDownIcon
                    className={`h-5 w-5 fill-black/60 group-hover:fill-black/50 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </DisclosureButton>
                <DisclosurePanel className="text-sm text-black/50 pl-3 overflow-x-hidden">
                  <ul className="pl-3">
                    <div>
                      {/* <button></button> */}
                      <input
                        type="input"
                        placeholder="Search Category..."
                        className="text-slate-700 h-7 pl-1 outline-none bg-transparent"
                      />
                    </div>
                    <div className="h-0.5 bg-slate-300/50 mb-2 mr-3" />
                    <div className="max-h-52 overflow-y-auto overflow-x-hidden space-y-1">
                      {item?.topCategories.map((category, idx) => (
                        <li
                          key={idx}
                          className="inline-block w-full truncate cursor-pointer rounded py-1 pl-1 text-slate-700 hover:bg-slate-300/50 hover:text-slate-800"
                        >
                          {category}
                        </li>
                      ))}
                    </div>
                  </ul>
                </DisclosurePanel>
              </div>
            )}
          </Disclosure>
        ))}
    </div>
  );
}
