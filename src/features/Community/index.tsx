import React, { ReactElement } from "react";

import CommunityList from "./components/CommunityList";
import Post from "./components/Posts";

export default function Community(): ReactElement {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-auto gap-6 sm:px-2 lg:px-8">
      <div className="min-w-40 max-w-44 space-y-5 pt-6">
        <CommunityList />
      </div>
      <div className="grid grow grid-cols-3 gap-4">
        <div className="col-span-2 pl-10">
          <Post />
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
}
