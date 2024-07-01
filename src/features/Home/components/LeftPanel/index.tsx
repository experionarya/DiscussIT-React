import React, { ReactElement } from "react";

export default function LeftPanel(): ReactElement {
  return (
    <div className="p-2">
      <button className="h-9 w-36 p-2 border border-primary flex items-center hover:border-primary-900 hover:text-primary-900 rounded text-primary">
       + Create Space
      </button>
      <button className="h-9 w-36 p-2 flex items-center hover:text-primary-900 rounded">
        NetWork Security
      </button>
      <button className="h-9 w-36 p-2 flex items-center hover:text-primary-900 rounded">
        Finance
      </button>
      <button className="h-9 w-36 p-2 flex items-center hover:text-primary-900 rounded">
        Human Resource
      </button>
    </div>
  );
}
