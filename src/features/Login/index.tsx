import React, { useEffect } from "react";
import { SilentRequest } from "@azure/msal-browser";
import { useNavigate } from "react-router-dom";

import { msalInstance } from "src/utils/authenticationHelper/msalInstance";
import { useAuth } from "src/utils/authenticationHelper/authProvider";

export default function Login() {
  const { account, login, logout, setIdToken } = useAuth();
  const navigate = useNavigate();

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
          setIdToken(tokenResponse.idToken);
          navigate("/home");
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
  }, [account, login, navigate, setIdToken]);

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
