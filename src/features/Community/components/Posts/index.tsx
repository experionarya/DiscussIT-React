import React, { ReactElement, useCallback, useEffect, useState } from "react";

import { PostItem } from "src/features/Community/components/Posts/PostItem";
import { Loading, NoData } from "src/components";

import { useGetAllPosts } from "../../api/useGetAllPosts";
import { useGetUserDetails } from "src/features/Header/api/useGetUserDetails";

import { useCommunityStore } from "../../store/communityStore";
import { ThreadType } from "../../types/postType";

export default function Post(): ReactElement {
  const category = useCommunityStore(
    useCallback((state) => state?.category, [])
  );
  const { data: userDetails } = useGetUserDetails();

  const [filterOption, setFilterOption] = useState<number>(0);
  const [sortOption, setSortOption] = useState<number>(0);

  const { data, isLoading, fetchNextPage, hasNextPage } = useGetAllPosts({
    communityCategoryMappingId: category?.categoryId,
    filterOption,
    sortOption,
    userID: userDetails?.userID,
  });

  const handleScroll = useCallback(
    (e: any) => {
      const bottom =
        e?.target?.documentElement?.clientHeight - 10 <
          e?.target?.documentElement?.scrollHeight -
            e?.target?.documentElement?.scrollTop &&
        e?.target?.documentElement?.scrollHeight -
          e?.target?.documentElement?.scrollTop <
          e?.target?.documentElement?.clientHeight + 10;

      if (bottom) {
        hasNextPage && fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  const posts = data?.pages?.flatMap((page) => page?.threads) || [];

  return (
    <>
      <div className="fixed w-[645px] bg-fill pt-6">
        <h1 className="font-semibold text-lg pb-3 text-slate-900">
          {category?.categoryName}
        </h1>
        {posts.length > 0 && (
          <div className="flex gap-5">
            <div className="text-slate-500 pb-2">
              <select
                name="filter"
                id="filter"
                className="bg-slate-200 p-0.5 rounded text-xs"
                value={filterOption}
                onChange={(e) => setFilterOption(Number(e.target.value))}
              >
                <option value="0" className="text-xs">
                  Replies
                </option>
                <option value="1" className="text-xs">
                  Upvotes
                </option>
                <option value="2" className="text-xs">
                  Date posted
                </option>
              </select>
            </div>
            {filterOption !== 2 ? (
              <div className="text-slate-500 pb-2">
                <select
                  name="sort"
                  id="sort"
                  className="bg-slate-200 p-0.5 rounded text-xs"
                  onChange={(e) => setSortOption(parseInt(e.target.value))}
                >
                  <option value="0" className="text-xs">
                    Most to least
                  </option>
                  <option value="1" className="text-xs">
                    Least to most
                  </option>
                </select>
              </div>
            ) : (
              <div className="text-slate-500 pb-2">
                <select
                  name="sort"
                  id="sort"
                  className="bg-slate-200 p-0.5 rounded text-xs"
                  onChange={(e) => setSortOption(parseInt(e.target.value))}
                >
                  <option value="0" className="text-xs">
                    Newest
                  </option>
                  <option value="1" className="text-xs">
                    Oldest
                  </option>
                </select>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="space-y-3 pb-7 pt-24">
        {isLoading ? (
          <div className="flex justify-center items-center pt-20">
            <Loading />
          </div>
        ) : !isLoading && posts.length > 0 ? (
          posts.map((item: ThreadType) => <PostItem postItem={item} />)
        ) : (
          !isLoading && (
            <div className="pt-36">
              <NoData data="No Posts Yet. Be the First one to post." />
            </div>
          )
        )}
      </div>
    </>
  );
}
