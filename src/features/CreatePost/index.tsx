import React, { ReactElement } from "react";
import { Button } from "src/components/Button";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import * as Tooltip from "@radix-ui/react-tooltip";
import { PencilIcon } from "@heroicons/react/24/solid";
export default function CreatePost(): ReactElement {
  return (
    <div className="mt-16 mx-auto flex w-full max-w-7xl flex-auto gap-6 pt-6 sm:px-2 lg:px-8">
      <div className="min-w-40 max-w-44 space-y-5" />
      <div className="grid grow grid-cols-3 gap-4">
        <div className="col-span-2 space-y-2 pl-10">
          <form className="w-full space-y-5 overflow-hidden rounded-md p-4 bg-white shadow-sm">
            <h1 className="font-semibold text-xl text-slate-900 flex items-center gap-2">
              <span className="size-10 bg-primary-100 rounded-full flex items-center justify-center">
                {" "}
                <PencilIcon className="size-6 text-primary-700" />
              </span>
              Create Post
            </h1>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label htmlFor="community" className="font-medium block">
                  Community
                </label>
                <select
                  name="community"
                  id="community"
                  className="h-9 w-72 rounded-lg px-3 border border-stroke-weak outline-none"
                >
                  <option value="PM-hub">PM-hub</option>
                  <option value="Experion discussion">
                    Experion discussion
                  </option>
                </select>
              </div>
              <div className="space-y-1">
                <label htmlFor="category" className="font-medium block">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  className="h-9 w-72 rounded-lg border px-3 border-stroke-weak outline-none"
                >
                  <option value="Java Programming">Java Programming</option>
                  <option value="Webpack">Webpack</option>
                  <option value="Amazon Web Services">
                    Amazon Web Services
                  </option>
                  <option value="Kubernetes">Kubernetes</option>
                  <option value="API Management">API Management</option>
                  <option value="D3.js">D3.js</option>
                  <option value="Async/Await">Async/Await</option>
                  <option value="RESTful APIs">RESTful APIs</option>
                  <option value="Talent Acquisition">Talent Acquisition</option>
                  <option value="JIRA">JIRA</option>
                  <option value="Workplace Culture">Workplace Culture</option>
                  <option value="Budgeting">Budgeting</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="title" className="font-medium block">
                Title
              </label>
              <input
                type="text"
                id="tag"
                className="h-9 w-full pl-2 rounded-lg border border-stroke-weak outline-none"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="description" className="font-medium">
                Description
              </label>
              <textarea
                id="description"
                className="w-full pl-2 rounded-lg border border-stroke-weak outline-none"
                rows={5}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="tag" className="font-medium block">
                Tag
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="tag"
                  className="h-9 w-full pl-2 pr-10 rounded-lg border border-stroke-weak outline-none"
                />
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button className="absolute top-1/2 transform -translate-y-1/2 right-2">
                        <InformationCircleIcon className="h-6 w-6 text-gray-500" />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="rounded-md data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                        sideOffset={5}
                        side="bottom"
                      >
                        <ul className="text-sm marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-700">
                          <li>
                            Tags should be descriptive and related to your post
                            content.
                          </li>
                          <li>
                            Avoid using single characters or numbers as tags.
                          </li>
                          <li>
                            Use relevant keywords to enhance searchability.
                          </li>
                          <li>
                            Check for suggestions provided below for accurate
                            and popular tags.
                          </li>
                          <li>
                            Ensure that tags accurately represent the main
                            topics or themes of your post.
                          </li>
                          <li>You cannot add invalid or inappropriate tags.</li>
                        </ul>
                        <Tooltip.Arrow className="fill-white" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
            </div>
            <div className="flex justify-end items-center gap-3">
              <Button size="medium" variant="secondary">
                Saved draft
              </Button>
              <Button size="medium" variant="primary">
                Post
              </Button>
            </div>
          </form>
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
}

// "absolute inset-0 bg-gradient-to-r from-[#36b49f] to-[#DBFF75] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100"
