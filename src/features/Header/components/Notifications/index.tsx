import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  CloseButton,
} from "@headlessui/react";

import { BellIcon } from "@heroicons/react/24/outline";
import { DoubleCheck } from "iconoir-react";

import { Button } from "../../../../components/Button";
import { useGetNotifications } from "../../api/useGetNotifications";
import { ReplyType } from "../../types/notificationType";
import { useReadSingleNotification } from "../../api/useReadSingleNotification";

dayjs.extend(utc);

export function Notifications(): ReactElement {
  const navigate = useNavigate();

  const { data: notificationList, refetch: refetchNotifications } =
    useGetNotifications();
  const {
    isLoading: markNotificationReadLoading,
    mutate: readSingleNotification,
  } = useReadSingleNotification();

  function goToViewAllNotification() {
    navigate(`/notifications`);
  }

  const createMarkup = (data?: string) => {
    return { __html: data || "" };
  };

  //   const [enabled, setEnabled] = useState(false);
  return (
    <Popover>
      <div className="relative">
        <PopoverButton
          type="button"
          className="relative rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800 focus:text-primary-800"
        >
          <BellIcon className="size-6" />
        </PopoverButton>
        <button className="bg-red-600 size-1 p-2 text-xs rounded-full absolute top-2 right-2 flex items-center justify-center text-white transform translate-x-1/2 -translate-y-1/2">
          {notificationList?.totalCount}
        </button>
      </div>

      <PopoverPanel
        anchor="bottom end"
        className="w-96 mt-6 rounded-md bg-white shadow-xl border ease-in-out"
      >
        <div className="px-4 py-3 flex justify-between items-center border-b border-slate-200">
          <h1 className="font-semibold text-slate-900 text-lg">
            Notifications
          </h1>
          {/* <div className="flex gap-2 leading-tight items-center">
            <span className="text-xs text-slate-900 font-semibold">
              Unread only
            </span>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className="group relative flex items-center h-5 w-9 cursor-pointer rounded-full border border-slate-300 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[checked]:bg-primary"
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block size-3 translate-x-0 rounded-full ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-4 ${
                  enabled ? "bg-white" : "bg-slate-300"
                }`}
              />
            </Switch>
          </div> */}
        </div>
        <div className="divide-y divide-slate-100 max-h-96 overflow-y-scroll">
          {notificationList &&
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
                  {/* <div className="size-2 bg-red-600 rounded-full flex-shrink-0" /> */}
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
                      <span>{`${item?.childReplyUserName}${"'"}s reply`}</span>
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
                          onSuccess: () => {
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
            ))}
        </div>
        <footer className="flex justify-between items-center p-3 border-t border-slate-200">
          {/* <hr className="mt-3" /> */}
          <button className="text-xs text-primary-800 flex font-semibold">
            <DoubleCheck className="size-4 mr-1" />
            <span>Mark all as read</span>
          </button>
          <CloseButton
            as={Button}
            onClick={goToViewAllNotification}
            variant="primary"
            size="medium"
          >
            View all notifications
          </CloseButton>

          {/* <Button
                    size="medium"
                    variant="primary"
                    onClick={goToViewAllNotification}
                  >
                    View all notifications
                  </Button> */}
        </footer>
      </PopoverPanel>
    </Popover>
  );
}
