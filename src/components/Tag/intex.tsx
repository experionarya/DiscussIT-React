import React, { ReactElement } from "react";

interface TagProps {
  tagArray: string[];
}

export default function Tag({ tagArray }: TagProps): ReactElement {
  return (
    <div>
      {tagArray?.map((tag, index) => (
        <span 
          key={index}
          className="inline-flex cursor-pointer items-center m-1 rounded-full bg-primary-50 px-2 max-w-[300px] truncate py-1 text-xs font-medium leading-tight text-primary-800 ring-1 ring-inset ring-primary-600/10 hover:bg-primary-100 hover:ring-primary-800/10"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
