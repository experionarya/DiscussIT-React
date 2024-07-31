import React, { ReactElement, useRef, useState } from "react";

import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { CheckCircleIcon as CheckCircleIconMicro } from "@heroicons/react/16/solid";
import { PencilSquareIcon as PencilSquareIconMicro } from "@heroicons/react/16/solid";
import { TrashIcon as TrashIconMicro } from "@heroicons/react/16/solid";

import { Button } from "src/components/Button";
import DialogBox from "./DialogBox";

export function Replies(): ReactElement {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  const [isReply, setIsReplay] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  function handleReplay() {
    setIsReplay(true);
  }

  function handleReplayCancel() {
    setIsReplay(false);
  }

  function handleDelete() {
    setIsDelete(true);
  }
  return (
    <>
      <div className="flex min-w-0 gap-x-2 pl-3 pt-0 mt-0">
        <img
          className="h-8 w-8 flex-none rounded-full bg-gray-50"
          src={require(`../../../assets/images/person-5.jpg`)}
          alt="avatar"
        />
        <div className="mt-1">
          <div className="min-w-0 flex">
            <p className="text-sm font-semibold leading-tight text-slate-900">
              Joel Reid
            </p>
            <p className="truncate text-xs leading-tight text-slate-500 ml-1 mt-0.5">
              .15 days
            </p>
            <button className="ml-1" title="Best Answer">
              <CheckCircleIconMicro className="size-4 text-green-500" />
              <span className="sr-only">Best Answer</span>
            </button>
          </div>
          <p className="text-slate-900 dark:text-slate-300 mt-1">
            The orange is not actually very visible in North West Australia…
            Where large parts of the soil is orange and red. It is highly
            visible in the areas an astronaut is “expected” to land… Like the
            ocean or tundra.
          </p>
          <div className="flex mt-2 space-x-3">
            <button
              title="Up vote"
              className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
            >
              <ArrowUpIconMicro className="size-4 text-gray-600" />
              <span className="sr-only">Up vote</span>
              <span>10</span>
            </button>
            <button
              title="Down vote"
              className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
            >
              <ArrowDownIconMicro className="size-4 text-gray-600" />
              <span className="sr-only">Down vote</span>
              <span>1</span>
            </button>
            <button
              className="rounded-full px-1 py-0.5 text-xs hover:bg-slate-200 font-semibold text-gray-600"
              onClick={handleReplay}
            >
              Reply
            </button>
            <button
              title="Edit"
              onClick={handleReplay}
              className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
            >
              <PencilSquareIconMicro className="size-4 text-gray-600" />
              <span className="sr-only">Edit</span>
            </button>
            <button
              title="Delete"
              onClick={handleDelete}
              className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
            >
              <TrashIconMicro className="size-4 text-gray-600" />
              <span className="sr-only">Delete</span>
            </button>
          </div>
          {isReply ? (
            <div className="rounded-lg border mt-2 border-stroke-weak bg-white w-full">
              <textarea
                ref={textareaRef}
                className="h-auto w-full min-h-9 pt-1 rounded-lg pl-2 outline-none overflow-hidden resize-none"
                placeholder="Add comment"
                rows={1}
                onInput={autoResize}
              />
              <div className="flex gap-1 justify-end m-1">
                <Button
                  size="medium"
                  variant="secondary"
                  onClick={handleReplayCancel}
                >
                  Cancel
                </Button>
                <Button size="medium" variant="primary">
                  Comment
                </Button>
              </div>
            </div>
          ) : null}
          {isDelete ? (
            <div>
              <DialogBox
                title="Delete Comment"
                description="Are sure you want delete comment?"
                button1="Cancel"
                button2="Delete"
                opened={isDelete}
              />
            </div>
          ) : null}
          <div className="flex mt-5">
            <img
              className="h-6 w-6 mr-2 flex-none rounded-full bg-gray-50"
              src={require(`../../../assets/images/person-3.jpg`)}
              alt="avatar"
            />
            <div className="mt-1">
              <div className="min-w-0 flex">
                <p className="text-sm font-semibold leading-tight text-slate-900">
                  Dona Riya
                </p>
                <p className="truncate text-xs leading-tight text-slate-500 ml-1 mt-0.5">
                  .11 days
                </p>
                <button className="ml-1" title="Mark as best answer">
                  <CheckCircleIconMicro className="size-4 text-gray-600" />
                  <span className="sr-only">Best Answer</span>
                </button>
              </div>
              <p>
                most of the earth is made up of water which they are more likely
                to land. Slash if they land on earth they’ll be fine but if they
                land in water the urgency of them needing to be found increases
              </p>
              <div className="flex mt-2 space-x-3">
                <button
                  title="Up vote"
                  className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
                >
                  <ArrowUpIconMicro className="size-4 text-gray-600" />
                  <span className="sr-only">Up vote</span>
                  <span>10</span>
                </button>
                <button
                  title="Down vote"
                  className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
                >
                  <ArrowDownIconMicro className="size-4 text-gray-600" />
                  <span className="sr-only">Down vote</span>
                  <span>1</span>
                </button>

                <button
                  title="Reply"
                  className="rounded-full px-1 py-0.5 text-xs hover:bg-slate-200 font-semibold text-gray-600"
                  onClick={handleReplay}
                >
                  Reply
                </button>
                <button
                  title="Edit"
                  className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
                >
                  <PencilSquareIconMicro className="size-4 text-gray-600" />
                  <span className="sr-only">Edit</span>
                </button>
              </div>
              <div className="flex mt-5">
                <img
                  className="h-6 w-6 mr-2 flex-none rounded-full bg-gray-50"
                  src={require(`../../../assets/images/person-3.jpg`)}
                  alt="avatar"
                />
                <div className="mt-1">
                  <div className="min-w-0 flex">
                    <p className="text-sm font-semibold leading-tight text-slate-900">
                      Dona Riya
                    </p>
                    <p className="truncate text-xs leading-tight text-slate-500 ml-1 mt-0.5">
                      .11 days
                    </p>
                  </div>
                  <p>
                    most of the earth is made up of water which they are more
                    likely to land. Slash if they land on earth they’ll be fine
                    but if they land in water the urgency of them needing to be
                    found increases
                  </p>
                  <div className="flex mt-2 space-x-3">
                    <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                      <ArrowUpIconMicro className="size-4 text-gray-600" />
                      <span className="sr-only">Up vote</span>
                      <span>8</span>
                    </button>
                    <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                      <ArrowDownIconMicro className="size-4 text-gray-600" />
                      <span className="sr-only">Down vote</span>
                      <span>3</span>
                    </button>
                    <button className="rounded-full px-1 py-0.5 text-xs hover:bg-slate-200 font-semibold text-gray-600">
                      Reply
                    </button>
                  </div>
                  <div className="flex mt-5">
                    <img
                      className="h-6 w-6 mr-2 flex-none rounded-full bg-gray-50"
                      src={require(`../../../assets/images/person-3.jpg`)}
                      alt="avatar"
                    />
                    <div className="mt-1">
                      <div className="min-w-0 flex">
                        <p className="text-sm font-semibold leading-tight text-slate-900">
                          Dona Riya
                        </p>
                        <p className="truncate text-xs leading-tight text-slate-500 ml-1 mt-0.5">
                          .11 days
                        </p>
                      </div>
                      <p>
                        most of the earth is made up of water which they are
                        more likely to land. Slash if they land on earth they’ll
                        be fine but if they land in water the urgency of them
                        needing to be found increases
                      </p>
                      <div className="flex mt-2 space-x-3">
                        <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                          <ArrowUpIconMicro className="size-4 text-gray-600" />
                          <span className="sr-only">Up vote</span>
                          <span>8</span>
                        </button>
                        <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                          <ArrowDownIconMicro className="size-4 text-gray-600" />
                          <span className="sr-only">Down vote</span>
                          <span>3</span>
                        </button>
                        <button className="rounded-full px-1 py-0.5 text-xs hover:bg-slate-200 font-semibold text-gray-600">
                          Reply
                        </button>
                      </div>
                      <div className="flex mt-5">
                        <img
                          className="h-6 w-6 mr-2 flex-none rounded-full bg-gray-50"
                          src={require(`../../../assets/images/person-3.jpg`)}
                          alt="avatar"
                        />
                        <div className="mt-1">
                          <div className="min-w-0 flex">
                            <p className="text-sm font-semibold leading-tight text-slate-900">
                              Dona Riya
                            </p>
                            <p className="truncate text-xs leading-tight text-slate-500 ml-1 mt-0.5">
                              .11 days
                            </p>
                          </div>
                          <p>
                            most of the earth is made up of water which they are
                            more likely to land. Slash if they land on earth
                            they’ll be fine but if they land in water the
                            urgency of them needing to be found increases
                          </p>
                          <div className="flex mt-2 space-x-3">
                            <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                              <ArrowUpIconMicro className="size-4 text-gray-600" />
                              <span className="sr-only">Up vote</span>
                              <span>8</span>
                            </button>
                            <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                              <ArrowDownIconMicro className="size-4 text-gray-600" />
                              <span className="sr-only">Down vote</span>
                              <span>3</span>
                            </button>
                            <button className="rounded-full px-1 py-0.5 text-xs hover:bg-slate-200 font-semibold text-gray-600">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-5">
            <img
              className="h-6 w-6 mr-2 flex-none rounded-full bg-gray-50"
              src={require(`../../../assets/images/person-7.jpg`)}
              alt="avatar"
            />
            <div className="mt-1">
              <div className="min-w-0 flex">
                <p className="text-sm font-semibold leading-tight text-slate-900">
                  Jose Miya
                </p>
                <p className="truncate text-xs leading-tight text-slate-500 ml-1 mt-0.5">
                  .10 days
                </p>
              </div>
              <p>
                most of the earth is made up of water which they are more likely
                to land. Slash if they land on earth they’ll be fine but if they
                land in water the urgency of them needing to be found increases
              </p>
              <div className="flex mt-2 space-x-3">
                <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                  <ArrowUpIconMicro className="size-4 text-gray-600" />
                  <span className="sr-only">Up vote</span>
                  <span>8</span>
                </button>
                <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                  <ArrowDownIconMicro className="size-4 text-gray-600" />
                  <span className="sr-only">Down vote</span>
                  <span>3</span>
                </button>
                <button className="rounded-full px-1 py-0.5 text-xs hover:bg-slate-200 font-semibold text-gray-600">
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
