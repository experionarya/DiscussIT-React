import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/16/solid";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

import { Button, Avatar, DialogBox } from "src/components";
import Search from "src/features/Header/components/Search";
import { Announcements } from "./components/Announcements";
import { Notifications } from "./components/Notifications";

import {
  getEmailFromToken,
  getNameFromToken,
} from "src/utils/authenticationHelper/tokenHandler";
import { getInitials } from "src/utils/common";

export default function Header(): ReactElement {
  const navigate = useNavigate();

  const userName = getNameFromToken();

  let [isOpen, setIsOpen] = useState(false);

  const [isLogOut, setIsLogOut] = useState(false);

  function handleLogOutDialogBox() {
    setIsLogOut(true);
  }

  function handleClose() {
    setIsLogOut(false);
  }

  function handleLogOut() {}
  const openSearch = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

  function goToCreatePost() {
    navigate(`/createpost`);
  }

  function goToHome() {
    navigate(`/home`);
  }

  function handleViewProfile() {
    navigate(`/profile`);
  }

  const handleKeyPress = useCallback(
    (event: any) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        openSearch();
      }
    },
    [openSearch]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <header className="sticky top-0 bg-white shadow-md shadow-slate-900/5 transition duration-500 dark:bg-slate-800 dark:shadow-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 grow items-center gap-5 md:gap-10">
          <button
            type="button"
            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open main menu</span>
            <svg
              className="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              className="hidden h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-shrink-0 items-center ml-2">
            <img
              src="https://discussit-dev.experionglobal.dev/assets/images/Logo.png"
              className="h-10 cursor-pointer"
              alt="Tailwind Play"
              onClick={goToHome}
            />
          </div>
          <nav className="hidden gap-2 self-stretch md:flex">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "relative flex items-center px-3 py-2 text-sm font-medium text-primary-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary-800 after:content-[''] dark:bg-slate-800/50"
                  : "flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-900/50 dark:hover:text-slate-200"
              }
              aria-current="page"
            >
              Home
            </NavLink>
            <NavLink
              to="/community/category-posts"
              className={({ isActive }) =>
                isActive
                  ? "relative flex items-center px-3 py-2 text-sm font-medium text-primary-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary-800 after:content-[''] dark:bg-slate-800/50"
                  : "flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-900/50 dark:hover:text-slate-200"
              }
              aria-current="page"
            >
              Communities
            </NavLink>
          </nav>

          <button
            type="button"
            className="group ml-auto flex h-6 w-6 items-center justify-center sm:justify-start md:ml-0 md:h-auto md:w-60 md:flex-none md:rounded-lg md:py-2.5 md:pl-4 md:pr-3.5 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-400 lg:w-80 xl:w-96 dark:md:ring-slate-600"
            onClick={openSearch}
          >
            <MagnifyingGlassIcon className="h-5 w-5 fill-slate-400" />
            <span className="sr-only md:not-sr-only md:ml-2 md:text-slate-500 md:dark:text-slate-400">
              Search Discuss it
            </span>
            <kbd className="ml-auto hidden font-medium text-slate-400 md:block dark:text-sky-200/50">
              <kbd className="font-sans">Ctrl </kbd>
              <kbd className="font-sans">K</kbd>
            </kbd>
          </button>
          <div className="ml-auto hidden gap-4 md:flex items-center">
            <Button size="medium" variant="primary" onClick={goToCreatePost}>
              <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
              Create post
            </Button>

            <Announcements />
            <Notifications />

            <Popover>
              <PopoverButton
                type="button"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                className="rounded-full p-1"
              >
                {/* <img
                  className="h-8 w-8 rounded-full"
                  src={require(`../../assets/images/person-2.jpg`)}
                  alt="person"
                /> */}
                <Avatar userName={getInitials(userName) || ""} />
              </PopoverButton>
              <PopoverPanel
                transition
                modal
                anchor="bottom end"
                className="mt-6 divide-y rounded-md bg-white shadow-xl border transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
              >
                <div className="px-4 py-3">
                  <CloseButton
                    className="flex gap-2 items-center"
                    onClick={handleViewProfile}
                  >
                    {/* <img
                      className="size-8 rounded-full"
                      src={require(`../../assets/images/person-2.jpg`)}
                      alt="person"
                    /> */}
                    <Avatar userName={getInitials(userName) || ""} />
                    <div className="flex flex-col items-start">
                      <p className="text-sm font-semibold">{userName}</p>
                      <p className="text-xs text-slate-500">
                        {getEmailFromToken()}
                      </p>
                    </div>
                  </CloseButton>
                </div>
                <div className="px-4 py-3">
                  <CloseButton
                    className="flex gap-3"
                    onClick={handleLogOutDialogBox}
                  >
                    <ArrowRightStartOnRectangleIcon className="size-6" />
                    <span className="text-sm font-semibold">Logout</span>
                  </CloseButton>
                </div>
              </PopoverPanel>
            </Popover>
          </div>
        </div>
      </div>
      {isOpen ? <Search isOpen={isOpen} close={closeSearch} /> : null}
      {isLogOut ? (
        <div>
          <DialogBox
            title="Please Confirm Logout"
            description="Are you sure you want to log out? You will be signed out of your account."
            button1="Cancel"
            button2="Logout"
            opened={isLogOut}
            handleClose={handleClose}
            handleAction={handleLogOut}
          />
        </div>
      ) : null}
    </header>
  );
}
