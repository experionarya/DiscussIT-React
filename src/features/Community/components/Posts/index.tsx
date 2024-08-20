import React, { ReactElement, useCallback } from "react";

import { PostItem } from "src/features/Community/components/Posts/PostItem";
import { NoData } from "src/components";

import { useCommunityStore } from "../../store/communityStore";

import { useGetAllPosts } from "../../api/useGetAllPosts";

import { ThreadType } from "../../types/postType";

export default function Post(): ReactElement {
  const category = useCommunityStore(
    useCallback((state) => state?.category, [])
  );

  const { data: posts, isLoading: isPostLoading } = useGetAllPosts(
    category?.categoryId
  );

  return (
    <>
      <div className="fixed w-[645px] bg-fill pt-6">
        <h1 className="font-semibold text-lg pb-3 text-slate-900">
          {posts?.categoryName}
        </h1>
        {posts?.threads && posts?.threads.length > 0 && (
          <div className="flex gap-5">
            <div className="text-slate-500 pb-2">
              <select
                name="filter"
                id="filter"
                className="bg-slate-200 p-0.5 rounded text-xs"
              >
                <option value="Replies" className="text-xs">
                  Replies
                </option>
                <option value="Upvotes" className="text-xs">
                  Upvotes
                </option>
                <option value="Date posted" className="text-xs">
                  Date posted
                </option>
              </select>
            </div>
            <div className="text-slate-500 pb-2">
              <select
                name="sort"
                id="sort"
                className="bg-slate-200 p-0.5 rounded text-xs"
              >
                <option value="Replies" className="text-xs">
                  Most to least
                </option>
                <option value="Upvotes" className="text-xs">
                  Least to most
                </option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 pb-7 pt-24">
        {!isPostLoading && posts?.threads && posts?.threads.length > 0
          ? posts?.threads?.map((item: ThreadType) => (
              <PostItem postItem={item} />
            ))
          : !isPostLoading && (
              <div className="pt-36">
                <NoData data="No Posts Yet. Be the First one to post." />
              </div>
            )}
      </div>
    </>
  );
}
