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
import Discussitlogo from "../../assets/images/Discussitlogo.png";

import { useLogoutUserAccount } from "./api/useLogoutAccount";
import { useGetUserDetails } from "./api/useGetUserDetails";

import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getEmailFromToken } from "src/utils/authenticationHelper/tokenHandler";
import { useCreatePostStore } from "../CreatePost/store/createPostStore";

export default function Header(): ReactElement {
  const navigate = useNavigate();

  let [isOpen, setIsOpen] = useState(false);
  const [isLogOut, setIsLogOut] = useState(false);

  const { logout } = useAuth();

  const { mutate: logoutAccount } = useLogoutUserAccount();
  const { data: userDetails } = useGetUserDetails();

  const clearPostDetails = useCreatePostStore(
    useCallback((state) => state.clearPostDetails, [])
  );

  function handleLogOutDialogBox() {
    setIsLogOut(true);
  }

  function handleClose() {
    setIsLogOut(false);
  }

  function handleLogOut() {
    if (userDetails?.userID) {
      logoutAccount({ userId: userDetails.userID });
      logout();
    } else {
      console.error("User ID is undefined.");
    }
    setIsLogOut(false);
  }

  const openSearch = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

  function goToCreatePost() {
    clearPostDetails();
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
      if (
        (event.ctrlKey && event.key === "k") ||
        (event.ctrlKey && event.key === "K")
      ) {
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
    <header className="sticky top-0 z-10 bg-white shadow-md shadow-slate-900/5 transition duration-500">
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
              src={Discussitlogo}
              alt="logo"
              className="h-10 cursor-pointer"
              onClick={goToHome}
            />
          </div>
          <nav className="hidden gap-4 self-stretch md:flex ml-8">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "relative flex items-center px-3 py-2 text-sm font-medium text-primary-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary-800 after:content-['']"
                  : "flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }
              aria-current="page"
            >
              Home
            </NavLink>
            <NavLink
              to="/community/category-posts"
              className={({ isActive }) =>
                isActive
                  ? "relative flex items-center px-3 py-2 text-sm font-medium text-primary-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary-800 after:content-['']"
                  : "flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }
              aria-current="page"
            >
              Communities
            </NavLink>
          </nav>

          <button
            type="button"
            className="group ml-auto flex h-6 w-6 items-center justify-center sm:justify-start md:ml-0 md:h-auto md:w-60 md:flex-none md:rounded-lg md:py-2.5 md:pl-4 md:pr-3.5 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-400 lg:w-80 xl:w-96"
            onClick={openSearch}
          >
            <MagnifyingGlassIcon className="h-5 w-5 fill-slate-400" />
            <span className="sr-only md:not-sr-only md:ml-2 md:text-slate-500">
              Search Discuss it
            </span>
            <kbd className="ml-auto hidden font-medium text-slate-400 md:block">
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
                <Avatar userName={userDetails?.name || ""} size="medium" />
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
                    <Avatar userName={userDetails?.name || ""} size="medium" />
                    <div className="flex flex-col items-start">
                      <p className="text-sm font-semibold">
                        {userDetails?.name}
                      </p>
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
      {isOpen ? (
        <Search isOpen={isOpen} close={closeSearch} setIsOpen={setIsOpen} />
      ) : null}
      {isLogOut ? (
        <div>
          <DialogBox
            title="Logout"
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
