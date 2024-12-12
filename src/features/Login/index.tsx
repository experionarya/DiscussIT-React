import React from "react";

import Discussitlogo from "../../assets/images/Discussitlogo.png";
import logoexperion from "../../assets/images/logoexperion.png";

import { useAuth } from "src/utils/authenticationHelper/authProvider";

export default function Login() {
  const { login } = useAuth();

  return (
    <div>
      <section className="h-full">
        <div className="grid grid-cols-2">
          <div
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="col-span-1 h-screen flex items-end"
          >
            <div className="bg-primary-950/50 w-full h-screen flex items-end">
              <div className="hidden lg:relative lg:block lg:p-14 lg:pb-28">
                <div className="block text-white">
                  <span className="sr-only">Home</span>
                </div>
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Welcome to Discuss It
                </h2>
                <p className="mt-4 leading-relaxed text-white">
                  Share your insights, ask questions, and grow together. Your
                  knowledge makes Experion Technologies a better place.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 h-screen bg-white">
            <div className="flex grow flex-col md:h-svh md:w-full">
              <div className="flex flex-col grow items-center justify-center gap-10">
                <img src={Discussitlogo} alt="logo" className="h-16" />
                <button
                  onClick={() => {
                    login();
                  }}
                  className="flex gap-2 items-center hover:bg-sky-200/50 border border-slate-400 px-3 py-2 rounded-md"
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
              <div className="flex justify-center p-5">
                <img src={logoexperion} alt="logo" className="h-7" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
