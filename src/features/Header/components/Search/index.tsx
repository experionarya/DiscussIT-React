import React, { ReactElement } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function Search({ isOpen, close }: any): ReactElement {
  return (
    <div>
      <Dialog
        open={isOpen}
        as="div"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black bg-opacity-65">
          <div className="flex mt-32 items-center justify-center">
            <DialogPanel className="w-full max-w-xl  rounded-md bg-white">
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
    </div>
  );
}
