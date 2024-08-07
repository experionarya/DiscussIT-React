import React, { ReactElement } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import { BellIcon } from "@heroicons/react/24/outline";
import { DoubleCheck } from "iconoir-react";

import NoData from "src/components/NoData";
import Loading from "src/components/Loading";

import {
  useReadAllNotification,
  useGetNotifications,
  useReadSingleNotification,
} from "../../api";

import { ReplyType } from "../../types/notificationType";
import { createMarkup } from "src/utils/common";

dayjs.extend(utc);

export function Notifications(): ReactElement {
  const {
    data: notificationList,
    refetch: refetchNotifications,
    isLoading: notificationListLoading,
  } = useGetNotifications();

  const {
    isLoading: markNotificationReadLoading,
    mutate: readSingleNotification,
  } = useReadSingleNotification();

  const {
    isLoading: markAllNotificationReadLoading,
    mutate: readAllNotification,
  } = useReadAllNotification();

  function handleMarkAllAsRead() {
    const replyIds =
      notificationList?.replies?.map((item: ReplyType) => item?.childReplyID) ||
      [];

    readAllNotification(
      { replyIds: replyIds },
      {
        onSettled: () => {
          refetchNotifications();
        },
      }
    );
  }

  return (
    <Popover>
      {({ open }) => (
        <>
          <div className="relative">
            <PopoverButton
              type="button"
              className={`relative rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
                open ? "border-2 border-primary-800" : "border-2 border-white"
              }`}
            >
              <BellIcon
                className={`size-6 ${open ? "text-primary-800" : ""}`}
              />
            </PopoverButton>
            <div className="bg-red-600 size-1 p-2 text-xs rounded-full absolute top-2 right-2 flex items-center justify-center text-white transform translate-x-1/2 -translate-y-1/2">
              {notificationList?.totalCount}
            </div>
          </div>
          <PopoverPanel
            modal
            transition
            anchor="bottom end"
            className="w-96 mt-6 rounded-md bg-white shadow-xl border transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            <div className="px-4 py-3 flex justify-between items-center border-b border-slate-200">
              <h1 className="font-semibold text-slate-900 text-lg">
                Notifications
              </h1>
              <button
                className={`text-xs ${
                  notificationList?.replies?.length === 0
                    ? "text-slate-400"
                    : "text-primary-800"
                } flex font-semibold`}
                disabled={notificationList?.replies?.length === 0}
                onClick={() => handleMarkAllAsRead()}
              >
                <DoubleCheck className="size-4 mr-1" />
                <span>Mark all as read</span>
              </button>
            </div>
            <div className="divide-y divide-slate-200 h-64 overflow-y-scroll ">
              {!markNotificationReadLoading &&
              notificationList &&
              notificationList?.replies?.length ? (
                notificationList?.replies.map((item: ReplyType) => (
                  <div className="px-4 pt-3 pb-2">
                    <div className="flex justify-between mb-1 items-start">
                      <p className="text-slate-900 leading-tight">
                        <span className="font-semibold leading-tight">
                          {item?.childReplyUserName}
                        </span>{" "}
                        <span className="text-sm leading-tight text-slate-500">
                          replied on your comment
                        </span>
                      </p>
                    </div>
                    <span className="truncate text-xs  text-slate-500 block mt-1">
                      {dayjs(item?.childReplyCreatedAt).format(
                        "MMM D, YYYY, h:mm A"
                      )}
                    </span>
                    <div className="bg-slate-100 rounded-md ml-5 mt-3 space-y-3 px-3 py-2">
                      <div>
                        <p className="text-sm text-slate-900 mb-2">
                          {`${item?.communityName} / ${item?.categoryName}`}
                        </p>
                        <p className="text-slate-600 text-xs flex gap-1">
                          <span>Your comment:</span>
                        </p>
                        <p
                          className="text-sm text-slate-900 truncate"
                          dangerouslySetInnerHTML={createMarkup(
                            item?.parentReplyContent
                          )}
                        />
                      </div>
                      <div>
                        <p className="text-slate-600 text-xs flex gap-1">
                          <span>{`${
                            item?.childReplyUserName
                          }${"'"}s reply`}</span>
                        </p>
                        <p
                          className="text-sm text-slate-900 line-clamp-2 font-medium"
                          dangerouslySetInnerHTML={createMarkup(
                            item?.childReplyContent
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button
                        className="text-xs text-primary-800 flex font-semibold"
                        onClick={() => {
                          readSingleNotification(
                            { replyId: item?.childReplyID },
                            {
                              onSettled: () => {
                                refetchNotifications();
                              },
                            }
                          );
                        }}
                      >
                        <span>Mark as read</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <NoData data={"No data available"} />
                </div>
              )}
              {(markNotificationReadLoading ||
                markAllNotificationReadLoading ||
                notificationListLoading) && <Loading />}
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
