import React, { ReactElement, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import { Thread } from "./components/Thread";
import { Comments } from "./components/Comments";
import { Replies } from "./components/Replies";
import { Loading } from "src/components";

import { usePostDetailsStore } from "./store/postDetailsStore";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

export default function PostDetails(): ReactElement {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();

  const [showComment, setShowComment] = useState<boolean>(false);

  const { tokenType } = useAuth();

  const getPostDetailsInfo = usePostDetailsStore(
    React.useCallback((state: any) => state.getPostDetailsInfo, [])
  );

  const postDetails = usePostDetailsStore(
    React.useCallback((state: any) => state.postDetails, [])
  );

  const isPostDetailsLoading = usePostDetailsStore(
    React.useCallback((state: any) => state.isPostDetailsLoading, [])
  );
  const threadId = location.search.split("threadId=")[1];

  const from = location.state?.from || "/"; // Default to '/' if no state is present

  useQuery(
    ["get_post_details", { threadId: threadId }],
    () => {
      getPostDetailsInfo({
        token: getParsedToken(),
        tokenType: tokenType,
        threadId: threadId,
      });
    },
    { staleTime: Infinity }
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-auto gap-6 pt-6 sm:px-2 lg:px-8">
      <div className="min-w-40 max-w-44 space-y-5 flex justify-end">
        <button
          className="fixed size-10 border border-stroke-stong/50 text-slate-700 bg-white rounded-full flex justify-center items-center"
          onClick={() => {
            queryClient.invalidateQueries(['get_post_details'])
            navigate(from)
          }}
        >
          <ArrowLeftIcon className="size-5" />
        </button>
      </div>
      <div className="grid grow grid-cols-3 gap-4 pl-10">
        <div className="col-span-2 space-y-2 pb-7">
          {isPostDetailsLoading ? <div className="flex justify-center items-center h-screen"><Loading/></div> : <article className="w-full space-y-3 overflow-hidden rounded-md bg-white p-3 shadow-sm">
            <Thread postDetails={postDetails} setShowComment={setShowComment} />
            <Comments postDetails={postDetails} />
            <Replies postDetails={postDetails} />
          </article>}
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
}
