import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import MyPost from "./Components/MyPost";
import Bookmarks from "./Components/Bookmarks";
import Drafts from "./Components/Drafts";
import { Avatar } from "src/components";

import { useGetSavedThreads } from "src/features/Home/api/useGetSavedThreads";
import { useGetUserDetails } from "../../api/useGetUserDetails";

import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { tabs } from "./Utils/tabs";
import { useHomeStore } from "src/features/Home/store/homeStore";

export default function Profile(): ReactElement {
  const [selectedTab, setSelectedTab] = useState(0);

  const location = useLocation();

  const { tokenType } = useAuth();

  const { data: userDetails } = useGetUserDetails();
  const { data: savedPosts } = useGetSavedThreads(userDetails?.userID);

  const getBookMarkedData = useHomeStore(
    useCallback((state: any) => state.getBookMarkedData, [])
  );

  const bookMarks = useHomeStore(
    useCallback((state: any) => state.bookMarks, [])
  );

  //calling the book mark apis\
  useQuery(
    ["get_threadIDs", savedPosts],
    () => {
      savedPosts?.forEach((savedPost) => {
        const parsedToken = getParsedToken();
        if (parsedToken && tokenType && savedPost?.threadID)
          getBookMarkedData({
            token: parsedToken,
            tokenType: tokenType,
            threadId: savedPost?.threadID,
          });
      });
    },
    { staleTime: Infinity }
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get("section");
    if (section === "bookmarks") {
      setSelectedTab(1);
    }
  }, [location]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-auto gap-6 sm:px-2 lg:px-8">
      <div className="min-w-40 max-w-44" />
      <div className="grid grow grid-cols-3 gap-4">
        <div className="col-span-2 pl-10 h-full">
          <div className="flex gap-4 items-center pt-5 pb-5 fixed w-[645px] bg-fill">
            <Avatar userName={userDetails?.name || ""} size="large" />
            <div>
              <p className="text-lg font-semibold">{userDetails?.name}</p>
              <div className="flex items-center">
                <p className="text-xs text-slate-500 pr-2">
                  {userDetails?.designationName}
                </p>
                <span className="text-[9px] text-slate-500 pr-1">●</span>
                <p className="text-xs text-slate-500">
                  {userDetails?.departmentName}
                </p>
              </div>
              <p className="text-xs font-semibold">{`Points: ${userDetails?.score}`}</p>
            </div>
          </div>
          <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
            {" "}
            <div className="border-b border-slate-300 pb-3 fixed mt-24 w-[645px] bg-fill">
              <TabList className="flex gap-4">
                {tabs.map((item) => (
                  <Tab
                    key={item.id}
                    className="text-sm flex-shrink-0 font-medium flex items-center leading-none px-5 py-2 border border-stroke-weak hover:bg-slate-200 rounded-full cursor-pointer data-[selected]:bg-slate-300"
                  >
                    {item.name}
                  </Tab>
                ))}
              </TabList>
            </div>
            <TabPanels>
              <TabPanel>
                <MyPost />
              </TabPanel>
              <TabPanel>
                <Bookmarks bookMarks={bookMarks} />
              </TabPanel>
              <TabPanel>
                {userDetails && <Drafts userDetails={userDetails} />}
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
}
