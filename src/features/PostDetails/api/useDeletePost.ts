import { useMutation, UseMutationResult } from "react-query";

import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { deletePost } from "src/utils/urls";

async function deleteMyPosts({
  token,
  tokenType,
  params,
}: {
  params: TVariables;
  tokenType: string;
  token: string | null;
}): Promise<TResult> {
  const response = await fetch(
    deletePost(params?.threadId, params?.modifierId, params?.communityID),
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
  threadId: number;
  modifierId: string;
  communityID: number;
};

type TError = string;
type TContext = unknown;
type TResult = any;

function useDeletePost(): UseMutationResult<
  TResult,
  TError,
  TVariables,
  TContext
> {
  const { tokenType } = useAuth();

  return useMutation(async (params: TVariables) => {
    const response = await deleteMyPosts({
      token: getParsedToken(),
      tokenType,
      params,
    });

    return response;
  });
}

export { useDeletePost };
