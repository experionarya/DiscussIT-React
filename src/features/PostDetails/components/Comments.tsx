import React, { ReactElement, useRef, useState } from "react";

import { Button } from "src/components/Button";
import DialogBox from "../../../components/DialogBox";

export function Comments(): ReactElement {
  const [isTextArea, setIsTextArea] = useState(false);
  const [isDiscardChanges, setIsDiscardChanges] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  function handleTextArea() {
    setIsTextArea(true);
  }

  function handleAddComments() {
    setIsDiscardChanges(true);
  }

  function handleClose() {
    setIsDiscardChanges(false);
  }

  return (
    <>
      <div className="flex gap-3 bg-slate-100 rounded-md p-3">
        <img
          className="h-8 w-8 rounded-full"
          src={require(`../../../assets/images/person-2.jpg`)}
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
              <Button size="medium" variant="secondary" onClick={handleClose}>
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
            handleClose={handleClose}
            handleAction={handleAddComments}
          />
        </div>
      ) : null}
    </>
  );
}
