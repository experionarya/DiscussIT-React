import React, { ReactElement } from "react";
import { useQuery } from "react-query";

import { CommunityDisclosure } from "./CommunityDisclosure";

import { useCommunityStore } from "../../store/communityStore";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { useAuth } from "src/utils/authenticationHelper/authProvider";

export default function CommunityList(): ReactElement {
  const { tokenType } = useAuth();

  const getCommunityInfo = useCommunityStore(
    React.useCallback((state: any) => state.getCommunityInfo, [])
  );

  useQuery(
    ["get_community", {}],
    () => {
      getCommunityInfo({
        token: getParsedToken(),
        tokenType: tokenType,
      });
    },
    { staleTime: Infinity }
  );

  return (
    <div className="fixed">
      <div className="max-h-full overflow-y-scroll">
        <aside className="min-w-40 max-w-52 space-y-8 pl-2 pr-2">
          <div className="space-y-1">
            <CommunityDisclosure />
          </div>
        </aside>
      </div>
    </div>
  );
}
