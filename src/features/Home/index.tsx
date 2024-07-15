import React, { ReactElement, useEffect } from "react";

import MiddlePanel from "../Home/components/MiddlePanel";
import RightPanel from "../Home/components/RightPanel";
import LeftPanel from "../Home/components/LeftPanel";

import { useGetMicrosoftInfo, useExternalLogin } from "src/hooks";

import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { useGetUserDetails } from "src/hooks/useGetUserDetails";
import { getUserIdFromToken } from "src/utils/authenticationHelper/tokenHandler";

export default function Home(): ReactElement {
  const { id_token } = useAuth();
  const { data: microsoftInfo } = useGetMicrosoftInfo();
  const { mutate: externalLogin } = useExternalLogin();
  const userId = getUserIdFromToken();
  const { refetch } = useGetUserDetails(userId);

  useEffect(() => {
    if (microsoftInfo)
      externalLogin({
        Provider: "microsoft",
        expiration: 0,
        Token: id_token,
        userDetails: microsoftInfo,
        username: "",
      });
  }, [externalLogin, id_token, microsoftInfo]);

  useEffect(() => {
    if (userId) refetch();
  }, [refetch, userId]);

  useEffect(() => {});

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
