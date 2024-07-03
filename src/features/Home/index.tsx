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
        Token: localStorage.getItem("token") || "",
        userDetails: microsoftInfo,
        username: "",
      });
  }, [externalLogin, microsoftInfo]);

  console.log("microsoftInfo", microsoftInfo);
  return (
    <body className="bg-fill h-full m-0 p-0 grid grid-cols-4">
      <div className="col-span-1 border border-r-stroke-weak p-3 text-sm flex flex-col items-end">
        <LeftPanel />
      </div>
      <div className="col-span-2">
        <MiddlePanel />
      </div>
      <div className="col-span-1 border border-l-strokeProvider: any, p0: string-weak flex flexp0: { Provider: string; }-col items-start">
        <RightPanel />
      </div>
    </body>
  );
}
