import React, { ReactElement, useRef, useState } from "react";
import { ArrowDownIcon as ArrowDownIconMicro } from "@heroicons/react/16/solid";
import { ArrowUpIcon as ArrowUpIconMicro } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconMicro } from "@heroicons/react/16/solid";
import { BookmarkIcon as BookmarkIconMicro } from "@heroicons/react/16/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "src/components/Button";
import { ShareIcon as ShareIconMicro } from "@heroicons/react/16/solid";
import { CheckCircleIcon as CheckCircleIconMicro } from "@heroicons/react/16/solid";
import { PencilSquareIcon as PencilSquareIconMicro } from "@heroicons/react/16/solid";
import { TrashIcon as TrashIconMicro } from "@heroicons/react/16/solid";
import DialogBox from "./DialogBox";

export default function Post(): ReactElement {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const [isTextArea, setIsTextArea] = useState(false);
  const [isReply, setIsReplay] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDiscardChanges, setIsDiscardChanges] = useState(false);
  function handleTextArea() {
    setIsTextArea(true);
  }

  function handleCancel() {
    setIsDiscardChanges(true);
  }

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
    <div className="mt-16 mx-auto flex w-full max-w-7xl flex-auto gap-6 pt-6 sm:px-2 lg:px-8">
      <div className="min-w-40 max-w-44 space-y-5 flex justify-end">
        <button className="size-10 border border-stroke-stong/50 text-slate-700 bg-white rounded-full flex justify-center items-center">
          <ArrowLeftIcon className="size-5" />
        </button>
      </div>
      <div className="grid grow grid-cols-3 gap-4 pl-10">
        <div className="col-span-2 space-y-2">
          <article className="w-full space-y-3 overflow-hidden rounded-md bg-white p-3 shadow-sm">
            <div className="flex min-w-0 gap-x-2">
              <img
                className="h-8 w-8 flex-none rounded-full bg-gray-50"
                src={require(`../../assets/images/person-4.jpg`)}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-tight text-slate-900">
                  Subha Lakshmi
                </p>
                <p className="truncate text-xs leading-tight text-slate-500">
                  October 15, 2024
                </p>
              </div>
            </div>
            <div className="space-y-1 cursor-pointer">
              <h5 className="font-semibold text-slate-900">
                How to handle exceptions in Java?
              </h5>
              <p className="text-slate-900">
                What are some best practices for handling exceptions in Java
                applications to ensure robust error handling and graceful
                degradation?
              </p>
            </div>
            <img
              src={require(`../../assets/images/Java.png`)}
              alt="java"
              className="cursor-pointer"
            />
            <div className="flex space-x-3">
              <button
                title="Up vote"
                className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
              >
                <ArrowUpIconMicro className="size-4 text-gray-600" />
                <span className="sr-only">Up vote</span>
                <span>20</span>
              </button>
              <button
                title="Down vote"
                className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
              >
                <ArrowDownIconMicro className="size-4 text-gray-600" />
                <span className="sr-only">Down vote</span>
                <span>3</span>
              </button>
              <button
                title="Comment"
                className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
              >
                <ChatBubbleOvalLeftIconMicro className="size-4 text-gray-600" />
                <span className="sr-only">Comment</span>
                <span>10</span>
              </button>
              <button
                title="Share"
                className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
              >
                <ShareIconMicro className="size-4 text-gray-600" />
                <span className="sr-only">Share</span>
              </button>
              <button
                title="Bookmark"
                className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200"
              >
                <BookmarkIconMicro className="ml-1 size-4 text-gray-600" />
                <span className="sr-only">Bookmark</span>
              </button>
            </div>
            <div className="flex gap-3 bg-slate-100 rounded-md p-3">
              <img
                className="h-8 w-8 rounded-full"
                src={require(`../../assets/images/person-2.jpg`)}
                alt="person"
              />
              {!isTextArea ? (
                <button
                  type="button"
                  className="border border-stroke-weak rounded-md bg-white h-9 w-full flex justify-start items-center pl-2 cursor-text"
                  onClick={handleTextArea}
                >
                  <span className="sr-only md:not-sr-only md:text-slate-400 md:dark:text-slate-400">
                    Add comment
                  </span>
                </button>
              ) : (
                <div className="rounded-lg border border-stroke-weak bg-white w-full">
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
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button size="medium" variant="primary">
                      Comment
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {isDiscardChanges ? (
              <div>
                <DialogBox
                  title="Discard comment?"
                  description=" You have a comment in progress, are you sure you
                            want to discard it?"
                  button1="Cancel"
                  button2="Add"
                  opened={isDiscardChanges}
                />
              </div>
            ) : null}
            <div className="flex min-w-0 gap-x-2 pl-3 pt-0 mt-0">
              <img
                className="h-8 w-8 flex-none rounded-full bg-gray-50"
                src={require(`../../assets/images/person-5.jpg`)}
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
                  The orange is not actually very visible in North West
                  Australia… Where large parts of the soil is orange and red. It
                  is highly visible in the areas an astronaut is “expected” to
                  land… Like the ocean or tundra.
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
                    src={require(`../../assets/images/person-3.jpg`)}
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
                      most of the earth is made up of water which they are more
                      likely to land. Slash if they land on earth they’ll be
                      fine but if they land in water the urgency of them needing
                      to be found increases
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
                        src={require(`../../assets/images/person-3.jpg`)}
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
                          they’ll be fine but if they land in water the urgency
                          of them needing to be found increases
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
                            src={require(`../../assets/images/person-3.jpg`)}
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
                              most of the earth is made up of water which they
                              are more likely to land. Slash if they land on
                              earth they’ll be fine but if they land in water
                              the urgency of them needing to be found increases
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
                                src={require(`../../assets/images/person-3.jpg`)}
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
                                  most of the earth is made up of water which
                                  they are more likely to land. Slash if they
                                  land on earth they’ll be fine but if they land
                                  in water the urgency of them needing to be
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
                    src={require(`../../assets/images/person-7.jpg`)}
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
                      most of the earth is made up of water which they are more
                      likely to land. Slash if they land on earth they’ll be
                      fine but if they land in water the urgency of them needing
                      to be found increases
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
            <div className="flex min-w-0 gap-x-2 pl-3 pt-0 mt-0">
              <img
                className="h-8 w-8 flex-none rounded-full bg-gray-50"
                src={require(`../../assets/images/person-5.jpg`)}
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
                </div>
                <p className="text-slate-900 dark:text-slate-300 mt-1">
                  The orange is not actually very visible in North West
                  Australia… Where large parts of the soil is orange and red. It
                  is highly visible in the areas an astronaut is “expected” to
                  land… Like the ocean or tundra.
                </p>
                <div className="flex mt-2 space-x-3">
                  <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                    <ArrowUpIconMicro className="size-4 text-gray-600" />
                    <span className="sr-only">Up vote</span>
                    <span>10</span>
                  </button>
                  <button className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs hover:bg-slate-200">
                    <ArrowDownIconMicro className="size-4 text-gray-600" />
                    <span className="sr-only">Down vote</span>
                    <span>1</span>
                  </button>
                  <button className="rounded-full px-1 py-0.5 text-xs hover:bg-slate-200 font-semibold text-gray-600">
                    Reply
                  </button>
                </div>
                <div className="flex mt-5">
                  <img
                    className="h-6 w-6 mr-2 flex-none rounded-full bg-gray-50"
                    src={require(`../../assets/images/person-3.jpg`)}
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
                      likely to land. Slash if they land on earth they’ll be
                      fine but if they land in water the urgency of them needing
                      to be found increases
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
                <div className="flex mt-5">
                  <img
                    className="h-6 w-6 mr-2 flex-none rounded-full bg-gray-50"
                    src={require(`../../assets/images/person-7.jpg`)}
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
                      most of the earth is made up of water which they are more
                      likely to land. Slash if they land on earth they’ll be
                      fine but if they land in water the urgency of them needing
                      to be found increases
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
          </article>
        </div>
        <div className="col-span-1 space-y-2 overflow-y-auto" />
      </div>
    </div>
  );
}
