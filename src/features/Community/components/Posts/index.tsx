import React, { ReactElement, useCallback } from "react";
import { PostItem } from "src/features/Community/components/Posts/PostItem";
import { useGetPostByCategories } from "../../api/useGetPostByCategories";
import { useCommunityStore } from "../../store/communityStore";

export default function Post(): ReactElement {
  const category = useCommunityStore(
    useCallback((state) => state?.category, [])
  );
  const { data: posts } = useGetPostByCategories(
    category?.communityId,
    category?.categoryId
  );

  console.log("posts", posts, category);
  return (
    <>
      <h1 className="font-semibold pb-3 text-lg text-slate-900">
        {category?.categoryName}
      </h1>
      <div className="space-y-3">
        {posts?.map((item) => (
          <PostItem postItem={item} />
        ))}
      </div>
    </>
  );
}
