import React, { ReactElement, useCallback, useEffect, useState } from "react";
// import NoData from "src/components/NoData";
import MyPost from "./Components/MyPost";
import Bookmarks from "./Components/Bookmarks";
import Drafts from "./Components/Drafts";
import { useLocation } from "react-router-dom";
import { useHomeStore } from "src/features/Home/store/homeStore";
import { useGetSavedThreads } from "src/features/Home/api/useGetSavedThreads";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { useQuery } from "react-query";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { tabs } from "./Utils";
import { Avatar } from "src/components";
import { getInitials } from "src/utils/common";
import { useGetUserDetails } from "../../api/useGetUserDetails";

export default function Profile(): ReactElement {
  const [selectedTab, setSelectedTab] = useState(0);

  const location = useLocation();

  const { tokenType } = useAuth();

  const { data: userDetails } = useGetUserDetails();

  console.log("userDetails", userDetails);

  const getBookMarkedData = useHomeStore(
    useCallback((state: any) => state.getBookMarkedData, [])
  );

  const bookMarks = useHomeStore(
    useCallback((state: any) => state.bookMarks, [])
  );

  const { data: savedPosts } = useGetSavedThreads(userDetails?.userID);

  //calling the book mark apis\
  useQuery(
    ["get_threadIDs", savedPosts],
    () => {
      savedPosts?.forEach((student) => {
        const parsedToken = getParsedToken();
        if (parsedToken && tokenType && student?.threadID)
          getBookMarkedData({
            token: parsedToken,
            tokenType: tokenType,
            threadId: student?.threadID,
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
          <div className="flex gap-4 items-center pt-5 fixed w-[645px] bg-fill">
            <Avatar userName={getInitials(userDetails?.name) || ""} />
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
            <div className="border-b border-slate-300 pb-1 fixed mt-24 w-[645px] bg-fill">
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
              <div className="flex gap-5 pt-3">
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
            <TabPanels>
              <TabPanel>
                <MyPost />
              </TabPanel>
              <TabPanel>
                <Bookmarks bookMarks={bookMarks} />
              </TabPanel>
              <TabPanel>
                <Drafts />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
}
