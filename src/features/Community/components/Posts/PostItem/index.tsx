import React, {
  ReactElement,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconMicro } from "@heroicons/react/16/solid";
import { ShareIcon as ShareIconMicro } from "@heroicons/react/16/solid";
import { BookmarkIcon as BookmarkIconMicro } from "@heroicons/react/16/solid";

import { Avatar } from "src/components";

import { useGetTagList } from "src/features/CreatePost/api";

import {
  createMarkup,
  getHtmlTextLength,
  trimHTMLContent,
} from "src/utils/common";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { useCreatePostStore } from "src/features/CreatePost/store/createPostStore";
import { ThreadType } from "src/features/Community/types/postType";

dayjs.extend(utc);

type PostItemType = {
  postItem: ThreadType;
};

export function PostItem({ postItem }: PostItemType): ReactElement {
  const navigate = useNavigate();
  const { tokenType } = useAuth();

  function gotoPost(id: number) {
    navigate(`/community/category-posts/replies?threadId=${id}`, {
      state: { from: window.location.pathname },
    });
  }

  const [userMode, updateUserMode] = useState<string>("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("threadID");

  //for setting the user mode
  useEffect(() => {
    if (location?.pathname.split("/").includes("edit-posts"))
      updateUserMode && updateUserMode("Edit");
    if (location?.pathname.split("/").includes("createpost"))
      updateUserMode && updateUserMode("Create");
  }, [location?.pathname, updateUserMode]);
  const getPostDetails = useCreatePostStore(
    useCallback((state) => state.getPostDetails, [])
  );

  const { data: trendingTags } = useGetTagList();

  //tag options
  const tagOptions = useMemo(() => {
    const value = trendingTags?.map((item: any) => ({
      value: item?.tagId,
      label: item?.tagName,
    }));

    return value;
  }, [trendingTags]);

  useQuery(["edit-post", id, userMode, tagOptions], () => {
    getPostDetails(id, userMode, tokenType, tagOptions);
  });

  return (
    <>
      <article className="w-full space-y-3 overflow-hidden rounded-md bg-white p-3 shadow-sm">
        <div className="flex min-w-0 gap-x-2">
          <Avatar userName={postItem?.createdByUser || ""} size="medium" />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-tight text-slate-900">
              {postItem?.createdByUser}
            </p>
            <p className="truncate text-xs leading-tight text-slate-500">
              {dayjs(postItem?.createdAt).format("MMM D, YYYY")}
            </p>
          </div>
        </div>
        <div
          className="space-y-1 cursor-pointer"
          onClick={() => gotoPost(postItem?.threadID)}
        >
          <h5 className="font-semibold text-slate-900">{postItem?.title}</h5>
          <div className="flex gap-2">
            {postItem?.tagNames?.map((tagItem: string) => (
              <button className="inline-flex cursor-pointer items-center rounded-full bg-primary-50 px-2 max-w-[300px] truncate py-1 text-xs font-medium leading-tight text-primary-800 ring-1 ring-inset ring-primary-600/10 hover:bg-primary-100 hover:ring-primary-800/10">
                {tagItem}
              </button>
            ))}
          </div>
          <p
            className="text-slate-900"
            dangerouslySetInnerHTML={createMarkup(
              trimHTMLContent(postItem?.content)
            )}
          />
          {getHtmlTextLength(postItem?.content) > 100 && (
            <button className="text-primary-800 underline">(More)</button>
          )}
        </div>
        <div
          className="flex space-x-3"
          onClick={() => gotoPost(postItem?.threadID)}
        >
          <button
            title="Up vote"
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
          >
            <ArrowUpIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Up vote</span>
            <span>{postItem?.upVoteCount}</span>
          </button>
          <button
            title="Down vote"
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
          >
            <ArrowDownIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Down vote</span>
            <span>{postItem?.downVoteCount}</span>
          </button>
          <button
            title="Comment"
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
          >
            <ChatBubbleOvalLeftIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Comment</span>
            <span>{postItem?.replyCount}</span>
          </button>
          <button
            title="Share"
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
          >
            <ShareIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Share</span>
          </button>
          <button
            className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
            title="Bookmark"
          >
            <BookmarkIconMicro className="size-4 text-gray-600" />
            <span className="sr-only">Bookmark</span>
          </button>
        </div>
      </article>
    </>
  );
}
