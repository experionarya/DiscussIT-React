import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { ReactElement } from "react";
import { Button } from "src/components/Button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function AddCategories({ isOpen, close }: any): ReactElement {
  const data = [
    "Webpack",
    "Amazon Web Services",
    "Kubernetes",
    "API Management",
    "D3.js",
    "Async/Await",
    "RESTful APIs",
    "Talent Acquisition",
    "JIRA",
    "Workplace Culture",
    "Budgeting",
    "Project Scheduling",
    "Agile Methodology",
    "AI",
    "Basecamp",
  ];
  return (
    <div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black bg-opacity-65">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="w-96 rounded-lg bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <div className="grid grid-cols-6 p-5">
                <DialogTitle as="h3" className="col-span-5">
                  <h1 className="font-semibold text-slate-900 flex ml-1">
                    Add categories
                  </h1>
                </DialogTitle>
                <button onClick={close} className="col-span-1 flex justify-end">
                  <XMarkIcon className="size-6 text-slate-400" />
                </button>
              </div>
              <div className="flex relative pl-5 pr-5">
                <button className="absolute mt-[10px] ml-2">
                  <MagnifyingGlassIcon className="size-4 text-slate-400" />
                </button>
                <input
                  type="text"
                  className="h-9 w-96 rounded-lg border border-stroke-weak pl-8 pr-2 outline-none"
                  placeholder="Search"
                />
              </div>
              <div className="max-h-80 overflow-y-scroll space-y-4 pl-7 pr-5 pt-3">
                {data?.map((data, index) => (
                  <ul className="flex gap-3">
                      <input
                        type="checkbox"
                        className=""
                      />
                    <li className=" text-sm text-slate-700">
                      {data}
                    </li>
                  </ul>
                ))}
              </div>
               <hr className="mt-3"/>
              <div className="flex gap-2 justify-end p-3">
                <button
                  className="bg-slate-300 text-sm font-semibold rounded-lg px-3 py-1"
                  onClick={close}
                >
                  Cancel
                </button>
                <Button size="medium" variant="primary" onClick={close}>
                  Add
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

