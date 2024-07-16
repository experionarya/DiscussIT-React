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

import { CommunityType } from "../../types/communityType";
import { CategoryType } from "../../types/categoryType";

type DisclosureType = {
  communityList: Array<CommunityType> | undefined;
};

export function CommunityDisclosure({
  communityList,
}: DisclosureType): ReactElement {
  const { tokenType } = useAuth();

  const [disclosureItems, setDisclosureItems] = useState<any>([]);
  const [categoryId, setCategoryId] = useState<number>();

  useEffect(() => {
    if (communityList) {
      const temp = communityList?.map((item) => {
        return {
          id: item?.communityID,
          name: item?.communityName,
          isOpen: false,
          content: null,
        };
      });
      if (temp) setDisclosureItems(temp);
    }
  }, [communityList]);

  const handleToggle = async (id: any) => {
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
            <Disclosure as="div" key={item?.id} defaultOpen={false}>
              {({ open }) => (
                <div>
                  <DisclosureButton
                    className={
                      open
                        ? "group flex w-full rounded items-center justify-between truncate font-semibold"
                        // "group flex w-full rounded items-center justify-between truncate font-semibold bg-sky-200/50"
                        : "group flex w-full rounded font-semibold items-center justify-between hover:bg-slate-300/25 truncate"
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
                        <button className="">
                          <MagnifyingGlassIcon className="size-4 text-slate-400" />
                        </button>
                        <input
                          type="input"
                          placeholder="Search"
                          className="text-slate-700 h-7 pl-1 outline-none bg-transparent"
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
                              setCategoryId(category?.communityCategoryID)
                            }
                          >
                            {category?.communityCategoryName}
                          </li>
                        ))}
                      </div>
                    </ul>
                  </DisclosurePanel>
                </div>
              )}
            </Disclosure>
          );
        })}
    </div>
  );
}
