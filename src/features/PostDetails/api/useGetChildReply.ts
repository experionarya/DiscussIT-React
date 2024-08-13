import { useMutation, UseMutationResult } from "react-query";

import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { postChildReply, editChildReply } from "src/utils/urls";

async function fetchChildReply({
  token,
  tokenType,
  params,
}: {
  params: TVariables;
  tokenType: string;
  token: string | null;
}): Promise<TResult> {
  const url = params?.isEdit === true ? editChildReply : postChildReply;
  const method = params?.isEdit ? "PUT" : "POST";
  const response = await fetch(
    url(
      params?.threadId,
      params?.userId,
      params?.communityId,
      params?.parentReplyId
    ),
    {
      method: method,
      headers: {
        Authorization: `${tokenType} ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params?.reply),
    }
  );
  return response.json();
}

type TVariables = {
  threadId: number;
  userId: string;
  communityId: number;
  parentReplyId: number;
  reply: any;
  isEdit: boolean;
};

type TError = string;
type TContext = unknown;
type TResult = any;

function useGetChildReply(): UseMutationResult<
  TResult,
  TError,
  TVariables,
  TContext
> {
  const { tokenType } = useAuth();

  return useMutation(async (params: TVariables) => {
    const response = await fetchChildReply({
      token: getParsedToken(),
      tokenType,
      params,
    });

    return response;
  });
}

export { useGetChildReply };
