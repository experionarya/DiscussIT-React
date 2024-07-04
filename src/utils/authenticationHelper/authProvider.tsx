import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AccountInfo,
  AuthenticationResult,
  SilentRequest,
} from "@azure/msal-browser";

import { initializeMsal, msalInstance } from "./msalInstance";
import { removeToken } from "./tokenHandler";
// import { getParsedToken, removeToken } from "./tokenHandler";

export interface AuthContextType {
  account: AccountInfo | null;
  token: string | null;
  // getParsedToken: () => string;
  // initialToken: string | null;
  // getToken: () => Promise<string | undefined>;
  login: () => Promise<void>;
  logout: () => void;
  tokenType: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  // const [token, setToken] = useState<string | null>(null);

  console.log("accountsssssss", account);

  useEffect(() => {
    const initialize = async () => {
      await initializeMsal();
      const accounts = msalInstance.getAllAccounts();
      console.log("accounts", accounts);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    };

    initialize();
  }, []);

  // const getToken = async () => {
  //   if (account) {
  //     return await acquireTokenSilently(account);
  //   } else {
  //     await login();
  //   }
  // };

  function setToken(token: string) {
    // console.log("setToken", parsedToken);
    localStorage.setItem("token", token);
  }

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
    console.log("acquireTokenSilently");
    if (account) {
      const silentRequest: SilentRequest = {
        account: account,
        scopes: ["User.Read"],
      };

      console.log("account 73", account);
      try {
        const tokenResponse: AuthenticationResult =
          await msalInstance.acquireTokenSilent(silentRequest);
        console.log("tokenResponse", tokenResponse);
        // setToken(tokenResponse?.accessToken);
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
        token: localStorage.getItem("AUTH_TOKEN"),
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
