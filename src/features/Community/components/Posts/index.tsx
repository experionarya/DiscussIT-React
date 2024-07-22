import React, { ReactElement, useCallback } from "react";
import { PostItem } from "src/features/Community/components/Posts/PostItem";
import { useCommunityStore } from "../../store/communityStore";
import { useGetAllPosts } from "../../api/useGetAllPosts";
import { ThreadType } from "../../types/postType";

export default function Post(): ReactElement {
  const category = useCommunityStore(
    useCallback((state) => state?.category, [])
  );

  const { data: posts } = useGetAllPosts(category?.categoryId);

  return (
    <>
      <h1 className="font-semibold pb-3 text-lg text-slate-900">
        {posts?.categoryName}
      </h1>
      <div className="space-y-3">
        {posts?.threads?.map((item: ThreadType) => (
          <PostItem postItem={item} />
        ))}
      </div>
    </>
  );
}
