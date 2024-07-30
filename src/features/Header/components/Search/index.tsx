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
        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-start justify-center mt-32">
            <DialogPanel className="w-full max-w-xl rounded-md bg-white">
              <div className="flex gap-3">
                <button className="ml-3">
                  <MagnifyingGlassIcon className="size-4 text-slate-400" />
                </button>
                <input
                  type="text"
                  className="w-full h-11 rounded-lg pr-2  outline-none"
                  placeholder="Search"
                />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
