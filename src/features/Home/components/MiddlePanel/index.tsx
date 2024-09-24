import React, { ReactElement, useCallback } from "react";

import { PostItem } from "./PostItem";

import { useHomeStore } from "../../store/homeStore";

import { BookMark } from "../../types/bookMarkDataType";
import { Loading } from "src/components";
import { useGetAllPosts } from "../../api";

export default function MiddlePanel(): ReactElement {
  const allPost = useHomeStore(useCallback((state) => state.allPosts, []));
  const filterByValue = useHomeStore(
    useCallback((state) => state.filterByValue, [])
  );

  const { isLoading } = useGetAllPosts({
    filterBy: filterByValue,
  });

  return (
    <div className="col-span-2 space-y-3 pb-7">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        allPost?.map((postItem: BookMark, index: number) => (
          <PostItem item={postItem} key={`${index}${postItem?.threadID}`} />
        ))
      )}
    </div>
  );
}
