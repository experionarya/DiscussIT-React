import React, { ReactElement } from "react";
import CommunityList from "./components/CommunityList";
// import CategoryList from "./components/CategoryList";
import Post from "./components/Posts/intex";

export default function Community(): ReactElement {
  return (
    <div className="mt-16 mx-auto flex w-full max-w-7xl flex-auto gap-6 pt-6 sm:px-2 lg:px-8">
    <div className="min-w-40 max-w-44 space-y-5">
      <CommunityList />
    </div>
    <div className="grid grow grid-cols-3 gap-4">
      <div className="col-span-2">
      <Post/>
      </div>
      <div className="col-span-1 space-y-2 overflow-y-auto"/>
    </div>   
  </div>
  );
}
