import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
// import Profile from "./components/Profile";
import { Button } from "../../components/Button";
import {
  BellIcon,
  MegaphoneIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
export default function Header(): ReactElement {
  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-md shadow-slate-900/5 transition duration-500 dark:bg-slate-800 dark:shadow-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 grow items-center gap-5 md:gap-10">
          <div className="flex flex-shrink-0 items-center ml-2">
            <img
              src="https://discussit-dev.experionglobal.dev/assets/images/Logo.png"
              className="h-10"
              alt="Tailwind Play"
            />
          </div>
          <nav className="hidden gap-2 self-stretch md:flex">
            <NavLink
              to="home"
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
              to="community"
              className={({ isActive }) =>
                isActive
                  ? "relative flex items-center px-3 py-2 text-sm font-medium text-primary-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary-800 after:content-[''] dark:bg-slate-800/50"
                  : "flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-900/50 dark:hover:text-slate-200"
              }
              aria-current="page"
            >
              Community
            </NavLink>
          </nav>

          <button
            type="button"
            className="group ml-auto flex h-6 w-6 items-center justify-center sm:justify-start md:ml-0 md:h-auto md:w-60 md:flex-none md:rounded-lg md:py-2.5 md:pl-4 md:pr-3.5 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-400 lg:w-80 xl:w-96 dark:md:ring-slate-600"
          >
            <MagnifyingGlassIcon className="h-5 w-5 fill-slate-400" />
            <span className="sr-only md:not-sr-only md:ml-2 md:text-slate-500 md:dark:text-slate-400">
              Search topics
            </span>
            <kbd className="ml-auto hidden font-medium text-slate-400 md:block dark:text-sky-200/50">
              <kbd className="font-sans">Ctrl </kbd>
              <kbd className="font-sans">K</kbd>
            </kbd>
          </button>

          <div className="ml-auto hidden gap-4 md:flex">
            <Button size="medium" variant="primary">
              <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
              Create post
            </Button>
            <NavLink to="announcements" className="ml-3">
              <button
                type="button"
                className="relative rounded-full p-1 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800 focus:text-primary-800"
              >
                <MegaphoneIcon className="size-6" />
              </button>
            </NavLink>
            <NavLink to="notifications">
              <button
                type="button"
                className="relative rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800 focus:text-primary-800"
              >
                <BellIcon className="size-6" />
              </button>
            </NavLink>
            <div className="relative flex shrink-0 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"></div>
            <button
              type="button"
              className="relative flex shrink-0 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <img
                className="h-8 w-8 rounded-full"
                src={require(`../../assets/images/person-4.jpg`)}
                alt="person"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
