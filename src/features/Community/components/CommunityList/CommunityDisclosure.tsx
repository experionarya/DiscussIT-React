import React, { ReactElement, useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { fetchCategoryByCommunity } from "../../store/apiStore";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { useCommunityStore } from "../../store/communityStore";

import { CategoryType } from "../../types/categoryType";

export function CommunityDisclosure(): ReactElement {
  const { tokenType } = useAuth();

  const communityList = useCommunityStore(
    React.useCallback((state: any) => state.communityList, [])
  );

  const [disclosureItems, setDisclosureItems] = useState<any>([]);

  useEffect(() => {
    if (communityList) {
      console.log("communityList", communityList);
      setDisclosureItems(communityList);
    }
  }, [communityList]);

  const handleToggle = async (id: number) => {
    setDisclosureItems((prevItems: any) =>
      prevItems.map((item: any) => {
        if (item.id === id) {
          return { ...item, isOpen: !item.isOpen };
        }
        return item;
      })
    );
    const itemToLoad = disclosureItems.find((item: any) => item.id === id);
    if (!itemToLoad.content) {
      const fetchedContent = await fetchCategoryByCommunity({
        token: getParsedToken(),
        tokenType: tokenType,
        communityId: id,
      });
      setDisclosureItems((prevItems: any) =>
        prevItems.map((item: any) => {
          if (item.id === id) {
            return { ...item, content: fetchedContent };
          }
          return item;
        })
      );
    }
  };

  return (
    <div className="space-y-3 text-sm">
      {disclosureItems &&
        disclosureItems.map((item: any) => {
          return (
            <Disclosure as="div" key={item?.id} defaultOpen={item?.isOpen}>
              {({ open }) => {
                return (
                  <div>
                    <DisclosureButton
                      className={
                        open
                          ? "group flex w-full rounded items-center justify-between truncate font-semibold"
                          : // "group flex w-full rounded items-center justify-between truncate font-semibold bg-sky-200/50"
                            "group flex w-full rounded font-semibold items-center justify-between hover:bg-slate-300/25 truncate"
                      }
                      onClick={() => {
                        handleToggle(item?.id);
                      }}
                    >
                      <div
                        className={
                          open
                            ? "cursor-pointer px-3 py-1 truncate"
                            : "cursor-pointer rounded px-3 py-1 text-slate-700 hover:text-slate-800 truncate"
                        }
                      >
                        {item.name}
                      </div>
                      <ChevronDownIcon
                        className={`h-5 w-5 fill-black/60 group-hover:fill-black/50 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="text-sm text-black/50 pl-3 overflow-x-hidden">
                      <ul className="pl-3">
                        <div className="flex">
                          <button>
                            <MagnifyingGlassIcon className="size-4 text-slate-400" />
                          </button>
                          <input
                            type="search"
                            placeholder="Search"
                            className="text-slate-700 h-7 pl-1 outline-none bg-transparent truncate"
                          />
                        </div>
                        <div className="h-0.5 bg-slate-300/50 mb-2 mr-3" />
                        <div className="max-h-[268px] overflow-y-auto overflow-x-hidden space-y-1">
                          {item?.content?.map((category: CategoryType) => (
                            <li
                              key={category?.communityCategoryID}
                              className="inline-block w-full truncate cursor-pointer rounded py-1 pl-1 text-slate-700 hover:bg-slate-300/50 hover:text-slate-800"
                              // inline-block w-full truncate bg-slate-300/50 cursor-pointer rounded py-1 pl-1 text-slate-700 hover:bg-slate-400/50 hover:text-slate-800
                              onClick={() =>
                                useCommunityStore
                                  .getState()
                                  .setCategory(
                                    item?.id,
                                    category?.communityCategoryID,
                                    category?.communityCategoryName
                                  )
                              }
                            >
                              {category?.communityCategoryName}
                            </li>
                          ))}
                        </div>
                      </ul>
                    </DisclosurePanel>
                  </div>
                );
              }}
            </Disclosure>
          );
        })}
    </div>
  );
}
