import React, { ReactElement, useEffect, useState } from "react";
// import NoData from "src/components/NoData";
import MyPost from "./Components/MyPost";
import Bookmarks from "./Components/Bookmarks";
import Drafts from "./Components/Drafts";
import { useLocation } from "react-router-dom";

export default function Profile(): ReactElement {
  const location = useLocation();

  const [isActive, setIsActive] = useState({
    isMyPost: true,
    isBookMarks: false,
    isDrafts: false,
  });

  function handleMyPost() {
    setIsActive({
      isMyPost: true,
      isBookMarks: false,
      isDrafts: false,
    });
  }

  function handleBookmars() {
    setIsActive({
      isMyPost: false,
      isBookMarks: true,
      isDrafts: false,
    });
  }

  function handleDrafts() {
    setIsActive({
      isMyPost: false,
      isBookMarks: false,
      isDrafts: true,
    });
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get("section");
    if (section === "bookmarks") {
      handleBookmars();
    }
  }, [location]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-auto gap-6 pt-6 sm:px-2 lg:px-8">
      <div className="min-w-40 max-w-44 space-y-5" />
      <div className="grid grow grid-cols-3 gap-4">
        <div className="col-span-2 pl-10">
          <div className="flex gap-4 items-center pb-5">
            <img
              className="size-[66px] rounded-full"
              src={require(`src/assets/images/person-2.jpg`)}
              alt="person"
            />
            <div>
              <p className="text-lg font-semibold">Arjun Krishnadas Pillai</p>
              <div className="flex items-center">
                <p className="text-xs text-slate-500 pr-2">Software Engineer</p>
                <span className="text-[9px] text-slate-500 pr-1">●</span>
                <p className="text-xs text-slate-500">DU6</p>
              </div>
              <p className="text-xs font-semibold">Points: 145</p>
            </div>
          </div>
          <div className="border-b border-slate-300">
            <ul className="flex flex-nowrap gap-4 items-center w-full pb-3">
              <li
                onClick={handleMyPost}
                className={`text-sm flex-shrink-0 font-medium flex items-center leading-none px-5 py-2 border border-stroke-weak hover:bg-slate-200 rounded-full cursor-pointer ${
                  isActive.isMyPost ? "bg-slate-300" : ""
                }`}
              >
                My Post
              </li>
              <li
                onClick={handleBookmars}
                className={`text-sm flex-shrink-0 font-medium flex items-center leading-none px-5 py-2 border border-stroke-weak hover:bg-slate-200 rounded-full cursor-pointer ${
                  isActive.isBookMarks ? "bg-slate-300" : ""
                }`}
              >
                Bookmarks
              </li>
              <li
                onClick={handleDrafts}
                className={`text-sm flex-shrink-0 font-medium flex items-center leading-none px-5 py-2 border border-stroke-weak hover:bg-slate-200 rounded-full cursor-pointer ${
                  isActive.isDrafts ? "bg-slate-300" : ""
                }`}
              >
                Drafts
              </li>
              <li className="text-sm flex-shrink-0 font-medium flex items-center leading-none px-5 py-2 border border-stroke-weak hover:bg-slate-200 rounded-full cursor-pointer">
                Upvoted
              </li>
              <li className="text-sm flex-shrink-0 font-medium flex items-center leading-none px-5 py-2 border border-stroke-weak hover:bg-slate-200 rounded-full cursor-pointer">
                Downvoted
              </li>
            </ul>
            <div className="flex gap-5 pb-1">
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
          </div>
          {isActive.isMyPost && <MyPost />}
          {isActive.isBookMarks && <Bookmarks />}
          {isActive.isDrafts && <Drafts />}
          {/* <div className="flex items-center justify-center h-full">
              <NoData data="You haven't posted anything yet."/>
          </div> */}
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
}
