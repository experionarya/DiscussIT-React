import React, { ReactElement } from "react";
import { PostItem } from "./PostItem";

export default function MiddlePanel(): ReactElement {
  return (
    <div className="col-span-2 space-y-3">
      <PostItem />
      <PostItem />
    </div>
  );
}
