import React, { ReactElement, useEffect, useState} from "react";
import { useQueryClient } from "react-query";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";

import { Trash2 } from "lucide-react";

import { Avatar, DialogBox, Loading, NoData } from "src/components";

import {
  createMarkup,
  getHtmlTextLength,
  trimHTMLContent,
} from "src/utils/common";
import { UserDetailsType } from "src/types/userDetailsTypes";
import { ThreadType } from "src/features/Community/types/postType";
import { useDeletePost } from "src/features/PostDetails/api/useDeletePost";
import { Button } from "src/components/Button";
import { useGetMyDrafts } from "../api/useGetDrafts";

export default function Drafts({
  userDetails,
}: {
  userDetails: UserDetailsType;
}): ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ThreadType | null>(null);

  const { data: draftPosts, isLoading } = useGetMyDrafts({
    userId: userDetails?.userID,
  });
  const { mutate: deleteReply, isLoading: deleteLoading } = useDeletePost();

  useEffect(() => {
    if (location && location.pathname) {
      localStorage.setItem("navigation", location.pathname);
    }
    console.log("location", location);
  }, [location]);

  function gotoPost(id: number) {
    navigate(`/community/category-posts/edit-posts?threadId=${id}`, {
      state: { from: window.location.pathname + window.location.search },
    });
  }

  function handleItemClick(event: React.MouseEvent, threadID: number) {
    if ((event.target as HTMLElement).closest("a")) {
      return;
    }
    gotoPost(threadID);
  }

  function handleDeletePost(item: ThreadType) {
    console.log("item", item);
    setSelectedItem(item);
    setIsDeleteConfirm(true);
  }

  function handleDeleteConfirmClose() {
    setIsDeleteConfirm(false);
  }

  function handleDeleteConfirmPost(
    threadID: number | undefined,
    modifierID: string | undefined,
    communityID: number | undefined
  ) {
    if (threadID && modifierID && communityID) {
      setIsDeleteConfirm(false);
      deleteReply(
        {
          threadId: threadID,
          modifierId: modifierID,
          communityID: communityID,
        },
        {
          onSuccess: () => {
            // const nav = localStorage.getItem("navigation") || "";
            // navigate(nav);
            queryClient.invalidateQueries(["get_my_draft"]);
          },
        }
      );
    }
  }

  return (
    <div className="pt-40 pb-7">
      <div className="space-y-3">
        {isLoading ? (
          <div className="flex justify-center items-center pt-20">
            <Loading />
          </div>
        ) : draftPosts && draftPosts.pages ? (
          draftPosts.pages.map((page) =>
            page?.threads?.length ? (
              page.threads.map((item: ThreadType, index: number) => (
                <article
                  key={index}
                  className="w-full space-y-3 overflow-hidden rounded-md bg-white p-3 shadow-sm"
                >
                  <div className="flex min-w-0 gap-x-2">
                    <Avatar userName={item.createdByUser} size="medium" />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-tight text-slate-900">
                        {item?.createdByUser}
                      </p>
                      <div className="flex">
                        <p className="truncate text-xs text-slate-500">
                          {item?.communityName}/{item?.categoryName}
                        </p>
                        <span className="text-[9px] text-slate-400 pl-2 pr-1">
                          ●
                        </span>
                        <p className="truncate text-xs text-slate-500">
                          {dayjs(item?.createdAt).format("MMM D, YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="space-y-1 cursor-pointer"
                    onClick={(event) => handleItemClick(event, item?.threadID)}
                  >
                    <h5 className="font-semibold text-slate-900">
                      {item?.title}
                    </h5>
                    <div className="flex gap-2 pb-2">
                      {item?.tagNames?.map((tagItem: string, index: number) => (
                        <button
                          key={index}
                          className="inline-flex cursor-pointer items-center rounded-full bg-primary-50 px-2 max-w-[300px] truncate py-1 text-xs font-medium leading-tight text-primary-800 ring-1 ring-inset ring-primary-600/10 hover:bg-primary-100 hover:ring-primary-800/10"
                        >
                          {tagItem}
                        </button>
                      ))}
                    </div>
                    <p className="text-slate-900 prevent-text-break-out inline">
                      <span
                        className="inline prose prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-a:text-sm"
                        id="content"
                        dangerouslySetInnerHTML={createMarkup(
                          trimHTMLContent(
                            item?.content === null ? "" : item?.content
                          )
                        )}
                      />
                      {getHtmlTextLength(item?.content) > 150 && (
                        <button className="text-primary-800 underline inline">
                          (More)
                        </button>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div
                      className="flex space-x-3"
                    >
                      
                      <Button
                        size="medium"
                        variant="text"
                        onClick={() => {
                          handleDeletePost(item)
                        }}
                      >
                        <Trash2
                          strokeWidth={3}
                          className="text-gray-600"
                          size={15}
                          style={{ marginRight: "8px", marginBottom: "2px"}}
                        />{" "}
                        Delete Draft
                        
                      </Button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="pt-40">
                <NoData data="You haven't added any drafts yet." />
              </div>
            )
          )
        ) : (
          <div className="pt-40">
            <NoData data="You haven't added any drafts yet." />
          </div>
        )}
      </div>
      {isDeleteConfirm && selectedItem && (
        <div>
          <DialogBox
            title="Delete Draft"
            description="Are you sure you want to delete this Draft?"
            button1="Cancel"
            button2="Delete"
            opened={isDeleteConfirm}
            handleClose={handleDeleteConfirmClose}
            handleAction={() => {
              handleDeleteConfirmPost(
                selectedItem?.threadID,
                userDetails?.userID,
                selectedItem?.communityID
              );
            }}
          />
        </div>
      )}
      {deleteLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-65">
          <Loading />
        </div>
      )}
    </div>
  );
}
