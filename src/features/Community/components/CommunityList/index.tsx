import React, { ReactElement } from "react";

import { CommunityDisclosure } from "./CommunityDisclosure";

import { useGetCommunityList } from "../../api/useGetCommunityList";

export default function CommunityList(): ReactElement {
  const { data: communityList } = useGetCommunityList();

  return (
    <div className="fixed">
      <div className="max-h-full overflow-y-scroll">
        <aside className="min-w-40 max-w-44 space-y-8 pl-2 pr-2">
          <div className="space-y-1 text-sm">
            <CommunityDisclosure communityList={communityList} />
          </div>
        </aside>
      </div>
    </div>
  );
}
