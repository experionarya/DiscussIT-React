import React, { ReactElement } from "react";

import { SingleReply } from "./SingleReply";

import { usePostDetailsStore } from "../store/postDetailsStore";
import { SingleReplyType } from "../types/replies";

export function Replies(): ReactElement {
  const primaryReplies = usePostDetailsStore(
    React.useCallback((state: any) => state.primaryReplies, [])
  );

  return (
    <>
      {primaryReplies?.replies?.map((primaryItem: SingleReplyType) => (
        <SingleReply key={primaryItem?.replyID} reply={primaryItem} />
      ))}
    </>
  );
}
