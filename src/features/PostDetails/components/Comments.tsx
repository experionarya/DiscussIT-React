import React, { ReactElement, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Button, DialogBox, TextEditor, Avatar } from "src/components";

import { useSaveReply } from "../api/useSaveReply";
import { useGetCommunityList } from "src/features/Community/api/useGetCommunityList";
import { useGetUserDetails } from "src/features/Header/api/useGetUserDetails";

import {
  getUserIdFromToken,
  getParsedToken,
} from "src/utils/authenticationHelper/tokenHandler";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { contentWarning } from "src/features/CreatePost/utils/postConstants";

import { usePostDetailsStore } from "../store/postDetailsStore";
import { truncateSync } from "fs";

import { validateUrlsInContent } from "../../../utils/urlValidator";

export function Comments({ postDetails }: { postDetails: any }): ReactElement {
  const { tokenType } = useAuth();

  const [isTextArea, setIsTextArea] = useState(false);
  const [isDiscardChanges, setIsDiscardChanges] = useState(false);
  const [reply, setReply] = useState<string>("");

  const location = useLocation();
  const threadId = location.search.split("threadId=")[1];

  const { data: userDetails } = useGetUserDetails();
  const { data: communityList } = useGetCommunityList();
  const { mutate: saveReply } = useSaveReply();
  const [contentUrlWarning, setContentUrlWarning] = useState<{
    isInvalid: boolean;
    invalidUrl: string | null;
  } | null>(null);

  useEffect(() => {
    const warning = validateUrlsInContent(reply);
    setContentUrlWarning(warning);
  }, [reply]);

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
    setIsTextArea(false);
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
        setIsTextArea(false);
        getPostDetailsInfo({
          token: getParsedToken(),
          tokenType: tokenType,
          threadId: threadId,
        });
        setReply("");
      },
    });
  }
  return (
    <>
      <div className="grid grow grid-cols-12 bg-slate-100 rounded-md p-3">
        <div className="col-span-1 items-start">
          <Avatar userName={userDetails?.name || ""} size="medium" />
        </div>
        <div className="col-span-11">
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
            <div className="rounded-lg border-stroke-weak bg-white w-full">
              <TextEditor
                value={reply}
                onChange={(e: any) => {
                  setReply(e);
                }}
                id="text-editor"
              />
              {reply && reply?.length < 20 && (
                <p className="text-red-500 text-xs pl-2 pt-1">
                  {contentWarning}
                </p>
              )}
              {contentUrlWarning && (
                <p className="text-red-500 text-xs pl-2 pt-1">
                  {contentUrlWarning.invalidUrl}
                </p>
              )}
              <div className="flex gap-1 justify-end m-1 pb-1">
                <Button size="medium" variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  size="medium"
                  variant="primary"
                  onClick={saveComment}
                  disabled={
                    reply?.length < 20 || contentUrlWarning?.isInvalid === true
                  }
                >
                  Reply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isDiscardChanges ? (
        <div>
          <DialogBox
            title="Discard comment?"
            description="You have a comment in progress, are you sure you
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
