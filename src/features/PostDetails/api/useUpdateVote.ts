import { useMutation, UseMutationResult } from "react-query";

import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { updateVote } from "src/utils/urls";
import { UpdateVoteType } from "../types/replies";

async function postVoteDetails({
  token,
  tokenType,
  params,
}: {
  params: TVariables;
  tokenType: string;
  token: string | null;
}): Promise<TResult> {
  const bodyParam = {
    downvoteCount: params?.downvoteCount,
    isDeleted: params?.isDeleted,
    isUpVote: params?.isUpVote,
    replyID: params?.replyId,
    upvoteCount: params?.upvoteCount,
    userID: params?.userId,
  };
  const response = await fetch(updateVote(params?.communityId), {
    method: "POST",
    headers: {
      Authorization: `${tokenType} ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyParam),
  });
  return response.json();
}

type TVariables = UpdateVoteType;

type TError = string;
type TContext = unknown;
type TResult = any;

function useUpdateVote(): UseMutationResult<
  TResult,
  TError,
  TVariables,
  TContext
> {
  const { tokenType } = useAuth();

  return useMutation(async (params: TVariables) => {
    console.log("params", params);
    const response = await postVoteDetails({
      token: getParsedToken(),
      tokenType,
      params,
    });

    return response;
  });
}

export { useUpdateVote };
