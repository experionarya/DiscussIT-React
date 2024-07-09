import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AccountInfo,
  AuthenticationResult,
  SilentRequest,
} from "@azure/msal-browser";
import { initializeMsal, msalInstance } from "./msalInstance";

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

  useEffect(() => {
    const initialize = async () => {
      await initializeMsal();
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    };
    initialize();
  }, []);

  const login = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup();
      setAccount(loginResponse.account);
      const token = await acquireTokenSilently(loginResponse.account);
      if (token) {
        setToken(token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    msalInstance.logoutPopup();
    setAccount(null);
    removeToken();
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
        return tokenResponse.accessToken;
      } catch (error) {
        console.error(
          "Silent token acquisition failed. Falling back to interactive login.",
          error
        );
        await login();
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
