import React, { ReactElement } from "react";
import MiddlePanel from "../Home/components/MiddlePanel";
import RightPanel from "../Home/components/RightPanel";
import LeftPanel from "../Home/components/LeftPanel";

export default function Home(): ReactElement {
  return (
    <body className="bg-fill h-full m-0 p-0 grid grid-cols-4">
        <div className="col-span-1 border border-r-stroke-weak p-3 text-sm flex flex-col items-end">
           <LeftPanel/>
        </div>
        <div className="col-span-2">
          <MiddlePanel />
        </div>
        <div className="col-span-1 border border-l-stroke-weak flex flex-col items-start">
          <RightPanel />
      </div>
    </body>
  );
}
