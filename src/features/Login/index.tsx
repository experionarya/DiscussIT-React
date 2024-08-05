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
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-white via-blue-100 to-sky-50 flex-col gap-9">
          <div className="h-72 w-[500px] bg-white rounded-lg shadow-md divide-y flex flex-col">
            <div className="flex justify-center items-center h-52">
              <img
                src={require(`src/assets/images/Discussit-logo.png`)}
                alt="experion-log"
                className="h-16"
              />
             
            </div>
            <div className="flex justify-center items-center h-20">
              <button
                onClick={login}
                className="flex gap-2 items-center border border-slate-400 px-3 py-2 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0,0,256,256"
                  width="27px"
                  height="27px"
                >
                  <g
                    fill="none"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                  >
                    <g transform="scale(5.33333,5.33333)">
                      <path
                        transform="translate(28,28) rotate(-180)"
                        d="M6,6h16v16h-16z"
                        fill="#ff5722"
                      ></path>
                      <path
                        transform="translate(68,28) rotate(-180)"
                        d="M26,6h16v16h-16z"
                        fill="#4caf50"
                      ></path>
                      <path
                        transform="translate(68,68) rotate(-180)"
                        d="M26,26h16v16h-16z"
                        fill="#ffc107"
                      ></path>
                      <path
                        transform="translate(28,68) rotate(-180)"
                        d="M6,26h16v16h-16z"
                        fill="#03a9f4"
                      ></path>
                    </g>
                  </g>
                </svg>
                <span className="text-lg font-semibold">
                  Login with Microsoft
                </span>
              </button>
            </div>
          </div>
            <img
                  src={require(`src/assets/images/logo-experion.png`)}
                  alt="experion-log"
                  className="h-7"
                />
        </div>
      )}
    </div>
  );
}
