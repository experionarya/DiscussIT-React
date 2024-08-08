import React, { ReactElement, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { Button } from "src/components/Button";
import DialogBox from "../../../components/DialogBox";
import TextEditor from "src/components/TextEditor";

import { useSaveReply } from "../api/useSaveReply";
import { useGetCommunityList } from "src/features/Community/api/useGetCommunityList";

import { getUserIdFromToken } from "src/utils/authenticationHelper/tokenHandler";

export function Comments({
  postDetails,
  setShowComment,
}: {
  postDetails: any;
  setShowComment: any;
}): ReactElement {
  const location = useLocation();
  const [isTextArea, setIsTextArea] = useState(false);
  const [isDiscardChanges, setIsDiscardChanges] = useState(false);
  const [reply, setReply] = useState<string>("");
  const threadId = location.search.split("threadID=")[1];

  const { data: communityList } = useGetCommunityList();

  const { mutate: saveReply } = useSaveReply();

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

  function saveComment() {
    const params = {
      threadId: parseInt(threadId),
      userId: getUserIdFromToken(),
      communityId: communityList?.find(
        (item: any) => item?.communityName === postDetails?.communityName
      )?.communityID,
      reply: reply,
    };

    saveReply(params, {
      onSettled: () => {
        setShowComment(false);
      },
    });
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
            {/* <textarea
              ref={textareaRef}
              className="h-auto w-full min-h-9 pt-1 rounded-lg pl-2 outline-none overflow-hidden resize-none"
              placeholder="Add comment"
              rows={1}
              onInput={autoResize}
            /> */}
            <TextEditor
              value={reply}
              onChange={(e: any) => {
                setReply(e);
              }}
              id="text-editor"
            />
            <div className="flex gap-1 justify-end m-1">
              <Button size="medium" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button size="medium" variant="primary" onClick={saveComment}>
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
