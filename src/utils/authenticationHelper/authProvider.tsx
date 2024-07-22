import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AccountInfo,
  AuthenticationResult,
  InteractionRequiredAuthError,
  SilentRequest,
} from "@azure/msal-browser";
import { msalInstance } from "./msalInstance";

import { removeToken } from "./tokenHandler";

export interface AuthContextType {
  account: AccountInfo | null;
  token: string | null;
  id_token: string | null;
  setIdToken: (id_token: string | null) => void;
  login: () => Promise<void>;
  logout: () => void;
  tokenType: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [id_token, setIdToken] = useState<string | null>(null);
  const [isInteractionInProgress, setIsInteractionInProgress] =
    useState<boolean>(false);

  useEffect(() => {
    const initialize = async () => {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        await acquireTokenSilently(accounts[0]);
      } else {
        const redirectResult = await msalInstance.handleRedirectPromise();
        if (redirectResult && redirectResult?.account) {
          setAccount(redirectResult.account);
          await acquireTokenSilently(redirectResult.account);
        } else {
          // No redirect result or no account found, show login if necessary
          console.log("No account found. User needs to login.");
        }
      }
    };
    initialize();
  }, []);

  const login = async () => {
    if (isInteractionInProgress) return;
    setIsInteractionInProgress(true);
    try {
      const loginResponse = await msalInstance.loginPopup();
      setAccount(loginResponse.account);
      const tokenResp = await acquireTokenSilently(loginResponse.account);
      if (tokenResp) {
        setToken(tokenResp);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsInteractionInProgress(false);
    }
  };

  const logout = () => {
    if (isInteractionInProgress) return;
    setIsInteractionInProgress(true);

    msalInstance
      .logoutPopup()
      .then(() => {
        setAccount(null);
        setToken(null);
        removeToken();
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      })
      .finally(() => {
        setIsInteractionInProgress(false);
      });
  };

  const acquireTokenSilently = async (account: AccountInfo) => {
    if (account) {
      const silentRequest: SilentRequest = {
        account: account,
        scopes: ["User.Read"],
      };
      try {
        const tokenResponse: AuthenticationResult =
          await msalInstance.acquireTokenSilent(silentRequest);
        console.log("tokenResponse", tokenResponse);
        setIdToken(tokenResponse?.idToken);
        setToken(tokenResponse?.accessToken);
        return tokenResponse.accessToken;
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          console.error(
            "Silent token acquisition failed. Falling back to interactive login.",
            error
          );
          setToken(null);
          await login();
        } else {
          console.error("Silent token acquisition failed:", error);
        }
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        account,
        token,
        id_token,
        setIdToken,
        login,
        logout,
        tokenType: "Bearer",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
