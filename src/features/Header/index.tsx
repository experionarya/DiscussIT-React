import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Profile from "./components/Profile";

export default function Header(): ReactElement {
  return (
    <div className="flex flex-row gap-9 h-16 bg-white shadow-lg items-center justify-center">
      <div>
        <img
          src="https://discussit-dev.experionglobal.dev/assets/images/Logo.png"
          className="h-9"
          alt="DisscusIt"
        />
      </div>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-text-strong font-bold" : "text-black"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="community"
        className={({ isActive }) =>
          isActive ? "text-text-strong font-bold" : "text-black"
        }
      >
        Community
      </NavLink>
      <div className="col-span-6">
        <input
          type="text"
          className="h-9 w-96 rounded border border-stroke-weak pl-4 pr-12 outline-none"
          placeholder="Search Topics..."
        />
      </div>
      <button className="h-9 w-28 rounded bg-primary text-white col-span-4 hover:bg-primary-500">
        Create Post
      </button>
      <NavLink
        to="announcements"
        className={({ isActive }) =>
          isActive ? "text-text-strong font-bold" : "text-black"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="28px"
          viewBox="0 -960 960 960"
          width="28px"
          fill="#5f6368"
        >
          <path d="M720-440v-80h160v80H720Zm48 280-128-96 48-64 128 96-48 64Zm-80-480-48-64 128-96 48 64-128 96ZM200-200v-160h-40q-33 0-56.5-23.5T80-440v-80q0-33 23.5-56.5T160-600h160l200-120v480L320-360h-40v160h-80Zm240-182v-196l-98 58H160v80h182l98 58Zm120 36v-268q27 24 43.5 58.5T620-480q0 41-16.5 75.5T560-346ZM300-480Z" />
        </svg>
      </NavLink>
      <NavLink
        to="notifications"
        className={({ isActive }) =>
          isActive ? "text-text-strong font-bold" : "text-black"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
        </svg>
      </NavLink>
      <div>
        <Profile />
      </div>
    </div>
  );
}
