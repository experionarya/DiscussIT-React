import React, { ReactElement } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";

export default function Profile(): ReactElement {
  function onLogout() {

  }

  return (
    <div className="relative inline-block mt-1">
      <Popover>
        {({ open }) => (
          <>
            <PopoverButton className="outline-none">
              <div className="rounded-full w-9 h-9 bg-lightOrange">
                <img
                  src={require(`../../../assets/images/person-4.jpg`)}
                  alt="person 3"
                  className="rounded-full w-9 h-9"
                />
              </div>
            </PopoverButton>
            <Transition
              show={open}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute z-10 mt-2 w-72 right-0 bg-white shadow-lg rounded-lg">
                <div className="h-96 overflow-y-auto">
                  <div className="h-20 bg-lightOrange rounded-t-lg m-0 w-72 flex justify-center">
                    <div className="rounded-full w-20 h-20 bg-white mt-12">
                      <img
                        src={require(`../../../assets/images/person-5.jpg`)}
                        alt="person 3"
                        className="rounded-full w-20 h-20 p-0.5"
                      />
                    </div>
                  </div>
                  <p className="text-lg mt-14 flex justify-center">Riya Therese George</p>
                  <p className="text-xs mt-1 flex justify-center">riyatherese@gamil.com</p>
                  <p className="mt-2 flex justify-center">DU - 6</p>
                  <div className="mt-3 flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="65px"
                      viewBox="0 -960 960 960"
                      width="65px"
                      fill="#EAC452"
                    >
                      <path d="m387-412 35-114-92-74h114l36-112 36 112h114l-93 74 35 114-92-71-93 71ZM240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm240-280q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z" />
                    </svg>
                  </div>
                  <div className="mt-5 flex justify-center">
                <button
                  className="items-center flex text-lg"
                  onClick={onLogout}
                >
                  Logout
                  <svg xmlns="http://www.w3.org/2000/svg" className="ms-2" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                </button>
              </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
