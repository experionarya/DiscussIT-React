import { useMutation, UseMutationResult } from "react-query";

import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { deleteReply as deleteReplyUrl } from "src/utils/urls";

async function deleteReply({
  token,
  tokenType,
  params,
}: {
  params: TVariables;
  tokenType: string;
  token: string | null;
}): Promise<TResult> {
  const response = await fetch(
    deleteReplyUrl(params?.replyId, params?.userId, params?.communityId),
    {
      method: "DELETE",
      headers: {
        Authorization: `${tokenType} ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
}

type TVariables = {
  replyId: number;
  userId: string;
  communityId: number;
};

type TError = string;
type TContext = unknown;
type TResult = any;

function useDeleteReply(): UseMutationResult<
  TResult,
  TError,
  TVariables,
  TContext
> {
  const { tokenType } = useAuth();

  return useMutation(async (params: TVariables) => {
    const response = await deleteReply({
      token: getParsedToken(),
      tokenType,
      params,
    });

    return response;
  });
}

export { useDeleteReply };
