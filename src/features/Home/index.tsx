import React, { ReactElement } from "react";
import { useQuery } from "react-query";

import MiddlePanel from "../Home/components/MiddlePanel";
import RightPanel from "../Home/components/RightPanel";
import LeftPanel from "../Home/components/LeftPanel";

import { useAuth } from "src/utils/authenticationHelper/authProvider";

import { useHomeStore } from "./store/homeStore";

export default function Home(): ReactElement {
  const { id_token, tokenType, token } = useAuth();

  const getHomeInfo = useHomeStore(
    React.useCallback((state: any) => state.getHomeInfo, [])
  );

  useQuery(
    ["get_micro_information", { id_token: id_token, token: token }],
    () => {
      getHomeInfo({
        token: token,
        tokenType: tokenType,
        id_token: id_token,
      });
    },
    { staleTime: Infinity }
  );

  return (
    <div className="mt-16 mx-auto flex w-full max-w-7xl flex-auto gap-6 pt-6 sm:px-2 lg:px-8">
      <div className="min-w-40 max-w-44 space-y-5">
        <LeftPanel />
      </div>
      <div className="grid grow grid-cols-3 gap-3">
        <div className="col-span-2 space-y-2">
          <MiddlePanel />
        </div>
        <div className="col-span-1 space-y-2 overflow-y-auto">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
