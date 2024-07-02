import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AccountInfo,
  AuthenticationResult,
  SilentRequest,
} from "@azure/msal-browser";

import { initializeMsal, msalInstance } from "./msalInstance";

export interface AuthContextType {
  token: string | null;
  account: AccountInfo | null;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);

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
      await acquireTokenSilently();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    msalInstance.logoutPopup();
    setAccount(null);
  };

  const acquireTokenSilently = async () => {
    if (account) {
      const silentRequest: SilentRequest = {
        account: account,
        scopes: ["User.Read"],
      };
      try {
        const tokenResponse: AuthenticationResult =
          await msalInstance.acquireTokenSilent(silentRequest);
        setToken(tokenResponse.accessToken);
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
    <AuthContext.Provider value={{ token, account, login, logout }}>
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
