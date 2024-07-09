import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { ReactElement } from "react";
import { Button } from "src/components/Button";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function CreateSpace({ isOpen, close }: any): ReactElement {
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
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-[550px] rounded-lg bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <div className="flex mb-5">
                <DialogTitle as="h3">
                  <h1 className="font-semibold text-slate-900 text-lg">Create Space</h1>
                </DialogTitle>
                <button onClick={close} className="ml-[369px]">
                  <XMarkIcon className="size-6"></XMarkIcon>
                </button>
              </div>
              {/* <div className="h-0.5 bg-slate-300/50 mb-5" /> */}

              {/* <div className="flex items-center"> */}
              <input
                type="text"
                className="h-9 w-full rounded-lg border mb-2 border-stroke-weak pl-4 pr-12 outline-none"
                placeholder="Search Interests..."
              />
              {/* </div> */}
              <div className="flex flex-row flex-wrap gap-5 p-3 max-h-80 overflow-y-scroll">
                {data?.map((data, index) => (
                  <div
                    key={index}
                    className="px-1 py-1 bg-primary-50 flex truncate active:bg-primary-100 max-w-full rounded-md font-medium leading-tight text-primary-800 ring-1 ring-inset ring-primary-600/10 hover:bg-primary-100 hover:ring-primary-800/10 cursor-pointer items-center"
                  >
                    <span>{data}</span>
                  </div>
                ))}
              </div>
              {/* <div className="h-0.5 bg-slate-300/50 mb-2 mt-2" /> */}
              <div className="flex gap-2 justify-end pt-3">
                <button className="bg-slate-300 rounded-lg px-2 py-1">
                  Cancel
                </button>
                <Button size="medium" variant="primary" onClick={close}>
                  Create
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
