import React, { ReactElement, useState } from "react";
import { NavLink } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
// import Profile from "./components/Profile";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import Search from "src/features/Header/components/Search";
import { BellIcon, MegaphoneIcon } from "@heroicons/react/24/outline";
import {
  // ChevronLeftIcon,
  PencilIcon,
  // ChevronRightIcon,
} from "@heroicons/react/16/solid";
export default function Header(): ReactElement {
  const navigate = useNavigate();

  let [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  function handleSearch() {
    setIsOpen(true);
  }

  function goToCreatePost() {
    navigate(`/createpost`);
  }

  function goToHome() {
    navigate(`/home`);
  }

  function goToNotifications() {
    navigate("/notifications");
  }

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
            onClick={handleSearch}
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
          <div className="ml-auto hidden gap-4 md:flex">
            <Button size="medium" variant="primary" onClick={goToCreatePost}>
              <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
              Create post
            </Button>
            <Popover>
              <div className="relative">
                <PopoverButton
                  type="button"
                  title="Announcement"
                  className="relative rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800 focus:text-primary-800"
                >
              <MegaphoneIcon className="size-6" />
                </PopoverButton>
                <div className="bg-red-600 size-2 text-xs rounded-full absolute top-2 right-2 flex items-center justify-center text-white transform translate-x-1/2 -translate-y-1/2"/>
              </div>
              <PopoverPanel
                anchor="bottom end"
                className="w-96 mt-6 rounded-md bg-white shadow-xl border ease-in-out"
              >
                <div className="px-4 pt-3 space-y-3 border-b border-slate-200 pb-3">
                  <h1 className="font-semibold text-slate-900 flex text-lg">
                    Announcement
                  </h1>
                  <ul
                    className="flex flex-nowrap gap-2 items-center w-full"
                    style={{
                      msOverflowStyle: "none",
                      scrollbarWidth: "none",
                    }}
                  >
                    {/* <div className="flex justify-between">
                    <button className="absolute bg-gradient-to-r from-white to-transparent">
                      <ChevronLeftIcon className="size-6 text-gray-600" />
                    </button>
                    <button className="absolute bg-gradient-to-l from-white to-transparent">
                      <ChevronRightIcon className="size-6 text-gray-600" />
                    </button>
                    </div> */}
                    <li className="text-sm flex-shrink-0 font-medium flex items-center leading-none px-2 py-1 border bg-slate-300 border-stroke-weak hover:bg-slate-100 rounded-full cursor-pointer">
                      All
                    </li>
                    <li className="text-sm flex-shrink-0 font-medium flex items-center leading-none px-2 py-1 border border-stroke-weak hover:bg-slate-100 rounded-full cursor-pointer">
                      PM-hub
                    </li>
                    <li className="text-sm flex-shrink-0 font-medium flex items-center leading-none px-2 py-1 border border-stroke-weak hover:bg-slate-100 rounded-full cursor-pointer">
                      Experion Discussion
                    </li>
                    {/* <li className="flex-shrink-0 max-w-full min-w-9 flex items-center px-2 border border-stroke-weak hover:bg-slate-100 rounded-full cursor-pointer">
                      Experion Discussion
                    </li>
                    <li className="flex-shrink-0 max-w-full min-w-9 flex items-center px-2 border border-stroke-weak hover:bg-slate-100 rounded-full cursor-pointer">
                      Experion Discussion
                    </li>
                    <li className="flex-shrink-0 max-w-full min-w-9 flex items-center px-2 border border-stroke-weak hover:bg-slate-100 rounded-full cursor-pointer">
                      Experion Discussion
                    </li>
                    <li className="flex-shrink-0 max-w-full min-w-9 flex items-center px-2 border border-stroke-weak hover:bg-slate-100 rounded-full cursor-pointer">
                      Experion Discussion
                    </li> */}
                    {/* <style>{`ul::-webkit-scrollbar { display: none; }`}</style> */}
                  </ul>
                </div>
                <div className="divide-y divide-slate-200 max-h-96 overflow-y-scroll">
                  <div className="px-4 py-3">
                    <h5 className="font-semibold text-sm text-slate-900 leading-tight">
                      Hey Experionites!
                    </h5>
                    <span className="truncate text-xs leading-tight text-slate-500 inline-block">
                      October 15, 2024
                    </span>
                    <p className="text-sm text-slate-900">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Possimus, accusantium!
                    </p>
                  </div>
                  <div className="px-4 py-3">
                    <h5 className="font-semibold text-sm text-slate-900 leading-tight">
                      Hey Experionites!
                    </h5>
                    <span className="truncate text-xs leading-tight text-slate-500 inline-block">
                      October 15, 2024
                    </span>
                    <p className="text-sm text-slate-900">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Pariatur earum doloremque atque accusamus natus, eligendi
                      temporibus reprehenderit id unde vero?
                    </p>
                  </div>
                  <div className="px-4 py-3">
                    <h5 className="font-semibold text-sm text-slate-900 leading-tight">
                      Hey Experionites!
                    </h5>
                    <span className="truncate text-xs leading-tight text-slate-500 inline-block">
                      October 15, 2024
                    </span>
                    <p className="text-sm text-slate-900">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eum at nulla ullam nihil nostrum ea, odit veniam magnam
                      illum? Consequuntur in voluptates praesentium architecto
                      temporibus modi suscipit minima tenetur animi ipsa. Quae
                      eius quod cumque distinctio, corporis qui voluptate quas?
                      Animi sequi aperiam atque asperiores voluptatum
                      exercitationem. Dicta at provident optio, deserunt quas
                      est soluta eius modi totam molestias sed, recusandae quasi
                      tempore mollitia officia distinctio harum quae officiis
                      laboriosam aut earum nostrum! Quasi optio atque
                      exercitationem deleniti eveniet deserunt neque corrupti
                      soluta vitae, consequuntur recusandae ratione, accusantium
                      quis voluptatum mollitia officiis. Harum assumenda earum
                      facere vero cum ipsam vel?
                    </p>
                  </div>
                  <div className="px-4 py-3">
                    <h5 className="font-semibold text-sm text-slate-900 leading-tight">
                      Hey Experionites!
                    </h5>
                    <span className="truncate text-xs leading-tight text-slate-500 inline-block">
                      October 15, 2024
                    </span>
                    <p className="text-sm text-slate-700">
                      If you are someone who is passionate about promoting
                      sustainable living, then what are some environmental
                      issues that you're particularly passionate about? Whether
                      it's reducing plastic waste, or combating climate change,
                      what issues are important to you and why?
                    </p>
                  </div>
                </div>
              </PopoverPanel>
            </Popover>
            <button
              type="button"
              title="Notification"
              className="relative rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800 focus:text-primary-800"
              onClick={goToNotifications}
            >
              <BellIcon className="size-6" />
            </button>
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
                src={require(`../../assets/images/person-2.jpg`)}
                alt="person"
              />
            </button>
          </div>
        </div>
      </div>
      {isOpen ? <Search isOpen={isOpen} close={handleClose} /> : null}
    </header>
  );
}
