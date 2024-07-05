import React, { ReactElement } from "react";
import Box from "src/components/Box/intext";

export default function CategoryList(): ReactElement {
  return (
    <div className="pl-2">
      <input
        type="input"
        className="ml-auto mb-7 flex h-6 w-6 items-center justify-center sm:justify-start md:ml-0 md:h-auto md:w-60 md:flex-none md:rounded-lg md:py-2.5 md:pl-4 md:pr-3.5 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-400 lg:w-80 xl:w-96 dark:md:ring-slate-600"
        placeholder="Search Category..."
      />
      <div className="flex flex-row flex-wrap gap-7">
         <Box/>
      </div>
    </div>
  );
}
