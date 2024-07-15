import React, { ReactElement } from "react";
import Disclosures from "src/components/Disclosure/intex";

export interface Data {
  community: string;
  category: string[];
}

export default function CommunityList(): ReactElement {
  const data: Data[] = [
    {
      community: "PM-hub",
      category: [
        "Java Programming",
        "C++",
        "Network Security",
        "Angular",
         
      ],
    },
    {
      community: "Experion Discussion",
      category: ["AI", "AI", "AI", "AI"],
    },
  ];

  return (
    <div className="fixed">
      <div className="max-h-full overflow-y-scroll">
        <aside className="min-w-40 max-w-44 space-y-8 pl-2 pr-2">
          <div className="space-y-1 text-sm">
            <Disclosures data={data} />
          </div>
        </aside>
      </div>
    </div>
  );
}
