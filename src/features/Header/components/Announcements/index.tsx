import React, { ReactElement, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import { MegaphoneIcon } from "@heroicons/react/24/outline";

import { NoData } from "src/components";

import { useGetCommunityList } from "src/features/Community/api/useGetCommunityList";
import { useGetAnnouncementByCommunity } from "../../api/useGetAnnouncementByCommunity";
import { useGetAllAnnouncements } from "../../api/useGetAllAnnouncement";

import { CommunityType } from "src/features/Community/types/communityType";
import { AnnouncementType } from "../../types/announcementType";

dayjs.extend(utc);

export function Announcements(): ReactElement {
  const [communityId, setCommunityId] = useState<number | undefined>(0);

  const { data: communityList } = useGetCommunityList();
  const { data: announcementList } = useGetAnnouncementByCommunity(communityId);
  const { data: allAnnouncements } = useGetAllAnnouncements();

  return (
    <Popover>
      {({ open }) => (
        <>
          <div className="relative">
            <PopoverButton
              type="button"
              title="Announcements"
              className={`relative rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
                open ? "border-2 border-primary-800" : "border-2 border-white"
              }`}
            >
              <MegaphoneIcon
                className={`size-6 ${open ? "text-primary-800" : ""}`}
              />
            </PopoverButton>
            {/* <div className="bg-red-600 size-2 text-xs rounded-full absolute top-2 right-2 flex items-center justify-center text-white transform translate-x-1/2 -translate-y-1/2" /> */}
          </div>
          <PopoverPanel
            anchor="bottom end"
            modal
            transition
            className="w-96 mt-6 rounded-md bg-white shadow-xl border transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            <div className="px-4 pt-3 space-y-3 border-b border-slate-200 pb-3">
              <h1 className="font-semibold text-slate-900 flex text-lg">
                Announcements
              </h1>
              <ul
                className="flex flex-nowrap gap-2 items-center w-full"
                style={{
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                {/* <div className="flex justify-between">
                <button className="absolute bg-gradient-to-r from-white to-transparent">
                <ChevronLeftIcon className="size-6 text-gray-600" />
                </button>
                <button className="absolute bg-gradient-to-l from-white to-transparent">
                <ChevronRightIcon className="size-6 text-gray-600" />
                </button>
                </div> */}
                <li
                  className={`text-sm flex-shrink-0 font-medium flex items-center leading-none px-2 py-1 border ${
                    communityId === 0 ? "bg-slate-300" : ""
                  } border-stroke-weak hover:bg-slate-100 rounded-full cursor-pointer`}
                  onClick={() => setCommunityId(0)}
                >
                  All
                </li>
                {communityList &&
                  communityList?.map((item: CommunityType) => (
                    <li
                      key={item?.communityID}
                      className={`text-sm flex-shrink-0 font-medium flex items-center leading-none px-2 py-1 border ${
                        item?.communityID === communityId ? "bg-slate-300" : ""
                      } border-stroke-weak hover:bg-slate-100 rounded-full cursor-pointer`}
                      onClick={() => setCommunityId(item?.communityID)}
                    >
                      {item?.communityName}
                    </li>
                  ))}

                {/* <style>{`ul::-webkit-scrollbar { display: none; }`}</style> */}
              </ul>
            </div>
            <div className="divide-y divide-slate-200 overflow-y-scroll h-64">
              {communityId === 0 ? (
                allAnnouncements && allAnnouncements.length ? (
                  allAnnouncements.map(
                    (allAnnouncementsItem: AnnouncementType) => (
                      <div className="px-4 py-3">
                        <h5 className="font-semibold text-sm text-slate-900 leading-tight">
                          {allAnnouncementsItem?.title}
                        </h5>
                        <span className="truncate text-xs leading-tight text-slate-500 inline-block">
                          {dayjs(allAnnouncementsItem?.createdAt).format(
                            "MMM D, YYYY"
                          )}
                        </span>
                        <p className="text-sm text-slate-900">
                          {allAnnouncementsItem?.content}
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <NoData data={"No announcements available"} />
                  </div>
                )
              ) : announcementList && announcementList.length ? (
                announcementList.map((announcementItem: AnnouncementType) => (
                  <div className="px-4 py-3">
                    <h5 className="font-semibold text-sm text-slate-900 leading-tight">
                      {announcementItem?.title}
                    </h5>
                    <span className="truncate text-xs leading-tight text-slate-500 inline-block">
                      {dayjs(announcementItem?.createdAt).format("MMM D, YYYY")}
                    </span>
                    <p className="text-sm text-slate-900">
                      {announcementItem?.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <NoData data={"No announcements available"} />
                </div>
              )}
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
