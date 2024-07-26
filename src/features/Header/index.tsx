import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  CloseButton,
  // PopoverBackdrop
} from "@headlessui/react";
import { Switch } from "@headlessui/react";

import {
  MagnifyingGlassIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { BellIcon } from "@heroicons/react/24/outline";

import { PencilIcon } from "@heroicons/react/16/solid";

import { Button } from "../../components/Button";
import Search from "src/features/Header/components/Search";
import { Announcements } from "./components/Announcements";

export default function Header(): ReactElement {
  const navigate = useNavigate();

  let [isOpen, setIsOpen] = useState(false);

  function goToCreatePost() {
    navigate(`/createpost`);
  }

  function goToHome() {
    navigate(`/home`);
  }

  function goToViewAllNotification() {
    navigate(`/notifications`);
  }

  function handleViewProfile() {
    navigate(`/profile`);
  }

  const openSearch = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

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

  const [enabled, setEnabled] = useState(false);

  return (
    <header className="fixed w-full top-0 bg-white shadow-md shadow-slate-900/5 transition duration-500 dark:bg-slate-800 dark:shadow-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 grow items-center gap-5 md:gap-10">
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
              <kbd className="font-sans">Ctrl</kbd>{" "}
              <kbd className="font-sans">K</kbd>
            </kbd>
          </button>
          <div className="ml-auto hidden gap-4 md:flex">
            <Button size="medium" variant="primary" onClick={goToCreatePost}>
              <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
              Create post
            </Button>

            <Announcements />
            <Popover>
              <div className="relative">
                <PopoverButton
                  type="button"
                  className="relative rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800 focus:text-primary-800"
                >
                  <BellIcon className="size-6" />
                </PopoverButton>
                <button className="bg-red-600 size-1 p-2 text-xs rounded-full absolute top-2 right-2 flex items-center justify-center text-white transform translate-x-1/2 -translate-y-1/2">
                  3
                </button>
              </div>

              <PopoverPanel
                anchor="bottom end"
                className="w-96 mt-6 rounded-md bg-white shadow-xl border ease-in-out"
              >
                <div className="px-4 py-3 flex justify-between items-center border-b border-slate-200">
                  <h1 className="font-semibold text-slate-900 text-lg">
                    Notifications
                  </h1>
                  <div className="flex gap-2 leading-tight items-center">
                    <span className="text-xs text-slate-900 font-semibold">
                      Unread only
                    </span>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className="group relative flex items-center h-5 w-9 cursor-pointer rounded-full border border-slate-300 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[checked]:bg-primary"
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block size-3 translate-x-0 rounded-full ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-4 ${
                          enabled ? "bg-white" : "bg-slate-300"
                        }`}
                      />
                    </Switch>
                  </div>
                </div>
                <div className="divide-y divide-slate-100 max-h-96 min-h-52 overflow-y-scroll">
                  <div className="px-4 pt-3 pb-4">
                    <div className="flex justify-between mb-1 items-start">
                      <p className="text-slate-900 leading-tight">
                        <span className="font-semibold leading-tight">
                          Shubha Sreelakshmi
                        </span>{" "}
                        <span className="text-sm leading-tight text-slate-500">
                          replied on your comment
                        </span>
                      </p>
                      <div className="size-2 bg-red-600 rounded-full flex-shrink-0" />
                    </div>
                    <span className="truncate text-xs  text-slate-500 block mt-1">
                      9:20 AM
                    </span>
                    <div className="bg-slate-100 rounded-md ml-5 mt-3 space-y-3 px-3 py-2">
                      <div>
                        <p className="text-slate-600 text-xs flex gap-1">
                          <span>Your comment:</span>
                        </p>
                        <p className="text-sm text-slate-900 truncate">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Possimus, accusantium!
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600 text-xs flex gap-1">
                          <span>Shubha's reply:</span>
                        </p>
                        <p className="text-sm text-slate-900 line-clamp-2 font-medium">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Possimus, accusantium!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pt-3 pb-4">
                    <div className="flex justify-between mb-1 items-start">
                      <p className="text-slate-900 leading-tight">
                        <span className="font-semibold leading-tight">
                          Anu Das
                        </span>{" "}
                        <span className="text-sm leading-tight text-slate-500">
                          replied on your comment
                        </span>
                      </p>
                      <div className="size-2 bg-slate-100 rounded-full flex-shrink-0" />
                    </div>
                    <span className="truncate text-xs  text-slate-500 block mt-1">
                      Tue 9:00 AM
                    </span>
                    <div className="bg-slate-100 rounded-md ml-5 mt-3 space-y-3 px-3 py-2">
                      <div>
                        <p className="text-slate-600 text-xs flex gap-1">
                          <span>Your comment:</span>
                        </p>
                        <p className="text-sm text-slate-900 truncate">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Possimus, accusantium!
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600 text-xs flex gap-1">
                          <span>Shubha's reply:</span>
                        </p>
                        <p className="text-sm text-slate-900 line-clamp-2 font-medium">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Optio, officia facilis. Ipsum quas laborum at
                          praesentium numquam tempore aliquam, hic ipsam
                          architecto mollitia consequuntur iusto vitae quam ea
                          corporis asperiores?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pt-3 pb-4">
                    <div className="flex justify-between mb-1 items-start">
                      <p className="text-slate-900 leading-tight">
                        <span className="font-semibold leading-tight">
                          Shubha Sreelakshmi
                        </span>{" "}
                        <span className="text-sm leading-tight text-slate-500">
                          replied on your comment
                        </span>
                      </p>
                      <div className="size-2 bg-slate-100 rounded-full flex-shrink-0" />
                    </div>
                    <span className="truncate text-xs  text-slate-500 block mt-1">
                      Mon 7/15
                    </span>
                    <div className="bg-slate-100 rounded-md ml-5 mt-3 space-y-3 px-3 py-2">
                      <div>
                        <p className="text-slate-600 text-xs flex gap-1">
                          <span>Your comment:</span>
                        </p>
                        <p className="text-sm text-slate-900 truncate">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Possimus, accusantium!
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600 text-xs flex gap-1">
                          <span>Shubha's reply:</span>
                        </p>
                        <p className="text-sm text-slate-900 truncate font-medium">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Possimus, accusantium!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <footer className="flex justify-between items-center p-3 border-t border-slate-200">
                  <button className="text-xs text-primary-800 flex font-semibold">
                    {/* <DoubleCheck className="size-4 mr-1" /> */}
                    <span>Mark all as read</span>
                  </button>
                  <CloseButton
                    as={Button}
                    onClick={goToViewAllNotification}
                    variant="primary"
                    size="medium"
                  >
                    View all notifications
                  </CloseButton>
                </footer>
              </PopoverPanel>
            </Popover>
            <Popover>
              <PopoverButton
                type="button"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                className="rounded-full p-1"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={require(`../../assets/images/person-2.jpg`)}
                  alt="person"
                />
              </PopoverButton>
              {/* <PopoverBackdrop className="fixed inset-0 bg-transparent overflow-hidden" /> */}
              <PopoverPanel
                transition
                anchor="bottom end"
                className="mt-6 divide-y rounded-md bg-white shadow-xl border ease-in-out"
              >
                <div className="px-4 py-3">
                  <CloseButton
                    className="flex gap-2 items-center"
                    onClick={handleViewProfile}
                  >
                    <img
                      className="size-8 rounded-full"
                      src={require(`../../assets/images/person-2.jpg`)}
                      alt="person"
                    />
                      <div className="flex flex-col items-start">
                        <p className="text-sm font-semibold">Arjun Krishnadas Pillai</p>
                        <p className="text-xs text-slate-500">arjunkrishnadaspillai@gmail.com</p>
                      </div>
                  </CloseButton>
                </div>
                <div className="px-4 py-3">
                  <CloseButton className="flex gap-3">
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
    </header>
  );
}
