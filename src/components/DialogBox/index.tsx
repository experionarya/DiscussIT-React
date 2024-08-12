import React, { ReactElement } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "src/components/Button";

type data = {
  title: string;
  description: string;
  button1: string;
  button2: string;
  opened: boolean;
  handleClose: () => void;
  handleAction: () => void;
};
export function DialogBox({
  title,
  description,
  button1,
  button2,
  opened,
  handleClose,
  handleAction,
}: data): ReactElement {
  return (
    <>
      <Dialog
        open={opened}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 bg-black opacity-65" aria-hidden="true" />
        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-96 rounded-lg bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <div className="grid grid-cols-6 p-5">
                <DialogTitle as="h3" className="col-span-5">
                  <h1 className="font-semibold text-slate-900 flex">{title}</h1>
                </DialogTitle>
                <button
                  onClick={handleClose}
                  className="col-span-1 flex justify-end"
                >
                  <XMarkIcon className="size-6 text-slate-400" />
                </button>
              </div>
              <div className="pl-5 pr-5">
                <p className="text-sm text-slate-700">{description}</p>
              </div>
              <hr className="mt-3" />
              <div className="flex gap-2 justify-end p-3">
                <Button size="large" variant="secondary" onClick={handleClose}>
                  {button1}
                </Button>
                <Button size="large" variant="danger" onClick={handleAction}>
                  {button2}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>{" "}
    </>
  );
}
