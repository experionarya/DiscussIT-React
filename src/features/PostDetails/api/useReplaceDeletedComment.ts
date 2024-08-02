import { useMutation, UseMutationResult } from "react-query";

import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { replaceDeletedContent } from "src/utils/urls";

async function updateDeletedCommentWithContent({
  token,
  tokenType,
  params,
}: {
  params: TVariables;
  tokenType: string;
  token: string | null;
}): Promise<TResult> {
  const bodyParam = "<b><i>This reply was deleted</i></b>";
  const response = await fetch(
    replaceDeletedContent(params?.replyId, params?.userId),
    {
      method: "PUT",
      headers: {
        Authorization: `${tokenType} ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyParam),
    }
  );
  return response.json();
}

type TVariables = {
  replyId: number;
  userId: string;
};

type TError = string;
type TContext = unknown;
type TResult = any;

function useReplaceDeletedComment(): UseMutationResult<
  TResult,
  TError,
  TVariables,
  TContext
> {
  const { tokenType } = useAuth();

  return useMutation(async (params: TVariables) => {
    const response = await updateDeletedCommentWithContent({
      token: getParsedToken(),
      tokenType,
      params,
    });

    return response;
  });
}

export { useReplaceDeletedComment };
