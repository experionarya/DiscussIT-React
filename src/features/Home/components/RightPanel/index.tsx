import React, { ReactElement } from "react";
// import LeaderBoard from "./Leaderboard";
import TrendingTags from "./TrendingTags";
export default function RightPanel(): ReactElement {
  return (
    <div className="p-5">
      <div className="border border-stroke-weak rounded p-4 pt-3 h- w-72 bg-white text-text-strong">
        <TrendingTags />
        <hr className="mt-7" />
        {/* <LeaderBoard /> */}
      </div>
    </div>
  );
}
