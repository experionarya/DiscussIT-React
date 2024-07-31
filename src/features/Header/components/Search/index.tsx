import React, { ReactElement } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function Search({ isOpen, close }: any): ReactElement {
  
  return (
    <>
      <Dialog open={isOpen} as="div" onClose={close}>
        <div
          className="fixed inset-0 bg-black/65 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 w-screen">
          <div className="flex min-h-full items-start justify-center mt-32">
            <DialogPanel className="w-full max-w-xl rounded-md bg-white">
              <div className="flex gap-3 border-b border-slate-200">
                <button className="ml-3">
                  <MagnifyingGlassIcon className="size-4 text-slate-400" />
                </button>
                <input
                  type="search"
                  className="w-full h-11 rounded-lg pr-4 outline-none"
                  placeholder="Search"
                />
              </div>
              <div className="divide-y max-h-96 overflow-y-scroll">
                <p className="p-4 pl-10 text-slate-600 hover:bg-sky-50 truncate">java programming</p>
                <p className="p-4 pl-10 text-slate-600 hover:bg-sky-50 truncate">java programming</p>
                <p className="p-4 pl-10 text-slate-600 hover:bg-sky-50 truncate">java programming</p>
                <p className="p-4 pl-10 text-slate-600 hover:bg-sky-50 truncate">java programming</p>
                <p className="p-4 pl-10 text-slate-600 hover:bg-sky-50 truncate">java programming</p>
                <p className="p-4 pl-10 text-slate-600 hover:bg-sky-50 truncate">java programming</p>
                <p className="p-4 pl-10 text-slate-600 hover:bg-sky-50 truncate">java programming</p>
                <p className="p-4 pl-10 text-slate-600 hover:bg-sky-50 truncate">java programming</p>
                <p className="p-4 pl-10 text-slate-600 hover:bg-sky-50 truncate">java programming</p>
                <p className="p-4 pl-10 text-slate-600 hover:bg-sky-50 truncate">java programming</p>
                <p className="p-4 pl-10 text-slate-600 hover:bg-sky-50 truncate">java programming</p>
                <p className="p-4 pl-10 text-slate-600 hover:bg-sky-50 truncate">java programming</p>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
