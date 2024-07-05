import React, { ReactElement, useEffect } from "react";
import MiddlePanel from "../Home/components/MiddlePanel";
import RightPanel from "../Home/components/RightPanel";
import LeftPanel from "../Home/components/LeftPanel";
import { useGetMicrosoftInfo } from "./api/useGetMicrosoftInfo";
import { useExternalLogin } from "./api/useExternalLogin";

export default function Home(): ReactElement {
  const { data: microsoftInfo } = useGetMicrosoftInfo();
  const { mutate: externalLogin } = useExternalLogin();

  useEffect(() => {
    if (microsoftInfo)
      externalLogin({
        Provider: "microsoft",
        expiration: 0,
        Token: localStorage.getItem("id_token") || "",
        userDetails: microsoftInfo,
        username: "",
      });
  }, [externalLogin, microsoftInfo]);

  console.log("microsoftInfo", microsoftInfo);
  return (
    <div className="mt-16 mx-auto flex w-full max-w-7xl flex-auto gap-6 pt-6 sm:px-2 lg:px-8">
      <div className="min-w-40 max-w-44 space-y-5">
        <LeftPanel />
      </div>
      <div className="grid grow grid-cols-3 gap-4">
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
