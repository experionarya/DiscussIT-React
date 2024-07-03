import React, { useEffect } from "react";
import { SilentRequest } from "@azure/msal-browser";

import { msalInstance } from "src/utils/authenticationHelper/msalInstance";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
// import { getDecodedToken } from "src/utils/authenticationHelper/tokenHandler";
// import { useGetMicrosoftInfo } from "./api/useGetMicrosoftInfo";

export default function Login() {
  const { account, login, logout } = useAuth();

  useEffect(() => {
    const ensureToken = async () => {
      if (account) {
        try {
          const silentRequest: SilentRequest = {
            account: account,
            scopes: ["User.Read"],
          };
          const tokenResponse = await msalInstance.acquireTokenSilent(
            silentRequest
          );
          console.log("Token acquired silently:", tokenResponse.accessToken);
          localStorage.setItem("token", tokenResponse.accessToken);
        } catch (error) {
          console.error(
            "Silent token acquisition failed. Falling back to interactive login.",
            error
          );
          await login();
        }
      }
    };

    ensureToken();
  }, [account, login]);

  return (
    <div>
      {account ? (
        <div>
          <h1>Welcome, {account.name}</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login with Microsoft</button>
      )}
    </div>
  );
}
