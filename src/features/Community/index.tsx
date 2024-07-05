import React, { ReactElement } from "react";
import CommunityList from "./components/CommunityList";
import CategoryList from "./components/CategoryList";
export default function Community(): ReactElement {
  return (
    <div className="mt-16 mx-auto flex w-full max-w-7xl flex-auto gap-6 pt-6 sm:px-2 lg:px-8">
    <div className="min-w-40 max-w-44 space-y-5">
      <CommunityList />
    </div>
    <div className="">
      <CategoryList/>
    </div>   
  </div>
  );
}
