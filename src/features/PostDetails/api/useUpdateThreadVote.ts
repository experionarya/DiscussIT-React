import { useMutation, UseMutationResult } from "react-query";

import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { updateThreadVote } from "src/utils/urls";

async function postVoteDetailsForThread({
  token,
  tokenType,
  params,
}: {
  params: TVariables;
  tokenType: string;
  token: string | null;
}): Promise<TResult> {
  const bodyParam = {
    isDeleted: params?.isDeleted,
    isUpVote: params?.isUpVote,
    threadID: params?.threadId,
    userID: params?.userId,
  };
  const response = await fetch(updateThreadVote(params?.communityId), {
    method: "POST",
    headers: {
      Authorization: `${tokenType} ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyParam),
  });
  return response.json();
}

type TVariables = {
  isDeleted: boolean;
  isUpVote: boolean;
  threadId: number | undefined;
  userId: string;
  communityId: number;
};

type TError = string;
type TContext = unknown;
type TResult = any;

function useUpdateThreadVote(): UseMutationResult<
  TResult,
  TError,
  TVariables,
  TContext
> {
  const { tokenType } = useAuth();

  return useMutation(async (params: TVariables) => {
    const response = await postVoteDetailsForThread({
      token: getParsedToken(),
      tokenType,
      params,
    });

    return response;
  });
}

export { useUpdateThreadVote };
