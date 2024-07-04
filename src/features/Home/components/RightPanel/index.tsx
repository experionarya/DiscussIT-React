import React, { ReactElement } from "react";
import LeaderBoard from "./Leaderboard";
import TrendingTags from "./TrendingTags";
export default function RightPanel(): ReactElement {
  return (
    <div className="fixed">
        <TrendingTags />
        <LeaderBoard />
    </div>
  );
}
