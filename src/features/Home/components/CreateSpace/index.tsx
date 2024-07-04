import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { ReactElement } from "react";
import { Button } from "src/components/Button";

export default function CreateSpace({ isOpen, close }: any): ReactElement {
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
              <DialogTitle as="h3" className="text-text-strong text-lg">
                <strong>Create Space</strong>
              </DialogTitle>
                <button onClick={close} className="ml-[369px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {/* <div className="flex items-center"> */}
              <input
                type="text"
                className="h-9 w-full mb-2 rounded-lg border border-stroke-weak pl-4 pr-12 outline-none"
                placeholder="Search Interests..."
              />
              {/* </div> */}
              <div className="flex flex-row flex-wrap gap-5 pt-5 min-h-20 max-h-80 overflow-y-scroll">
                <Button size="small" variant="tag">
                  Cloud
                </Button>
                <Button size="small" variant="tag">
                  Machine Learning
                </Button>
                <Button size="small" variant="tag">
                  Java
                </Button>
                <Button size="small" variant="tag">
                  AI
                </Button>
                <Button size="small" variant="tag">
                  Python
                </Button>
                <Button size="small" variant="tag">
                  Flutter
                </Button>
                <Button size="small" variant="tag">
                  Testing
                </Button>
                <Button size="small" variant="tag">
                  Testing
                </Button>
                <Button size="small" variant="tag">
                  Testing
                </Button>
                <Button size="small" variant="tag">
                  Testing
                </Button>
                <Button size="small" variant="tag">
                  Testing
                </Button>
                <Button size="small" variant="tag">
                  Testing
                </Button>
                <Button size="small" variant="tag">AI</Button>
      <Button size="small" variant="tag">Python</Button>
      <Button size="small" variant="tag">Flutter</Button>
      <Button size="small" variant="tag">Testing</Button>
      <Button size="small" variant="tag">Cloud</Button>
      <Button size="small" variant="tag">Design</Button>
      <Button size="small" variant="tag">WPF</Button>
      <Button size="small" variant="tag">React</Button>
      <Button size="small" variant="tag">Human Resource</Button>
      <Button size="small" variant="tag">Angular</Button>
      <Button size="small" variant="tag">C++</Button>
      <Button size="small" variant="tag">Finance</Button>
      <Button size="small" variant="tag">Next</Button>
      <Button size="small" variant="tag">React Native</Button>
      <Button size="small" variant="tag">Machine Learning</Button>
      <Button size="small" variant="tag">Flutter</Button>
      <Button size="small" variant="tag">Python</Button>
      <Button size="small" variant="tag">Design</Button>
      <Button size="small" variant="tag">Java</Button>
      <Button size="small" variant="tag">Angular</Button>
      <Button size="small" variant="tag">WPF</Button>
      <Button size="small" variant="tag">C Programming</Button>
      <Button size="small" variant="tag">Python</Button>
      <Button size="small" variant="tag">Mysql</Button>
              </div>
              <div className="flex gap-2 justify-end pt-3">
              <button className="bg-gray-400 rounded-lg px-2 py-1">Cancel</button>
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
