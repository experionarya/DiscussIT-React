import React, { ReactElement, useState } from "react";
import { useLocation } from "react-router-dom";

import { Button, DialogBox, TextEditor, Avatar } from "src/components";

import { useSaveReply } from "../api/useSaveReply";
import { useGetCommunityList } from "src/features/Community/api/useGetCommunityList";

import {
  getUserIdFromToken,
  getParsedToken,
} from "src/utils/authenticationHelper/tokenHandler";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { contentWarning } from "src/features/CreatePost/utils/postConstants";

import { usePostDetailsStore } from "../store/postDetailsStore";

export function Comments({
  postDetails,
  setShowComment,
}: {
  postDetails: any;
  setShowComment: any;
}): ReactElement {
  const { tokenType } = useAuth();

  const [isTextArea, setIsTextArea] = useState(false);
  const [isDiscardChanges, setIsDiscardChanges] = useState(false);
  const [reply, setReply] = useState<string>("");

  const location = useLocation();
  const threadId = location.search.split("threadId=")[1];

  const { data: communityList } = useGetCommunityList();
  const { mutate: saveReply } = useSaveReply();

  const getPostDetailsInfo = usePostDetailsStore(
    React.useCallback((state: any) => state.getPostDetailsInfo, [])
  );

  function handleTextArea() {
    setIsTextArea(true);
  }

  function handleAddComments() {
    setIsDiscardChanges(true);
  }

  function handleClose() {
    setIsDiscardChanges(false);
    setShowComment(false);
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
        getPostDetailsInfo({
          token: getParsedToken(),
          tokenType: tokenType,
          threadId: threadId,
        });
      },
    });
  }

  return (
    <>
      <div className="flex gap-3 bg-slate-100 rounded-md p-3">
        <Avatar userName={postDetails?.createdByUser|| ""} size="small"/>
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
          <div className="rounded-lg  border-stroke-weak bg-white w-full">
            <TextEditor
              value={reply}
              onChange={(e: any) => {
                setReply(e);
              }}
              id="text-editor"
            />
            <div className="flex gap-1 justify-end m-1">
              {reply && reply?.length < 20 && (
                <p className="text-red-500 text-sm">{contentWarning}</p>
              )}
              <Button size="medium" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                size="medium"
                variant="primary"
                onClick={saveComment}
                disabled={reply?.length < 20}
              >
                Reply
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
