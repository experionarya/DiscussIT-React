import React, { ReactElement, useCallback } from "react";

import { PostItem } from "./PostItem";

import { useHomeStore } from "../../store/homeStore";

import { BookMark } from "../../types/bookMarkDataType";

export default function MiddlePanel(): ReactElement {
  const allPost = useHomeStore(useCallback((state) => state.allPosts, []));

  return (
    <div className="col-span-2 space-y-3">
      {allPost?.map((postItem: BookMark, index: number) => (
        <PostItem item={postItem} key={`${index}${postItem?.threadID}`} />
      ))}
    </div>
  );
}
