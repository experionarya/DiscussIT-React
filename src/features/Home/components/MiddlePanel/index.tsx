import React, { ReactElement, useCallback, useEffect } from "react";

import { PostItem } from "./PostItem";
import { Loading } from "src/components";

import { useGetAllPosts } from "../../api";

import { BookMark } from "../../types/bookMarkDataType";
import { useHomeStore } from "../../store/homeStore";
import { useLocation } from "react-router-dom";


export default function MiddlePanel(): ReactElement {
  const allPost = useHomeStore(useCallback((state) => state.allPosts, []));
  const filterByValue = useHomeStore(
    useCallback((state) => state.filterByValue, [])
  );

  const { isLoading } = useGetAllPosts({
    filterBy: filterByValue,
  });

  //Save scroll position and avoid unwanted scrolling
  const location = useLocation();
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('page1-scroll');

    if (savedScrollPosition) {
      window.scrollTo(0, Number(savedScrollPosition));
    }

    const handleScroll = () => {
      sessionStorage.setItem('page1-scroll', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);
  
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
