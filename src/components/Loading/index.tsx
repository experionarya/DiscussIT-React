import React, { ReactElement } from "react";

export function Loading(): ReactElement {
  return (
    <div className="relative">
      <div className="size-16 rounded-full absolute border border-solid border-gray-200"></div>
      <div className="size-16 rounded-full animate-spin absolute border border-solid border-primary-800 border-t-transparent shadow-md"></div>
    </div>
  );
}
