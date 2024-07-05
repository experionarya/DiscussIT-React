import React, { ReactElement } from "react";

export default function Box(): ReactElement {
  return (
    <div>
      <div className="min-h-24 min-w-80 border-t-2 border-primary-500  bg-white rounded-lg flex flex-col justify-center shadow-md hover:shadow-lg">
        <h5 className="font-semibold flex justify-center text-slate-900">
          <span>Network security</span>
        </h5>
        <p className="flex justify-center text-slate-500">20 Posts</p>
      </div>
    </div>
  );
}

