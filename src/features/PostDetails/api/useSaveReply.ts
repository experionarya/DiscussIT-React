import { useMutation, UseMutationResult } from "react-query";

import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { saveReply } from "src/utils/urls";

async function postReply({
  token,
  tokenType,
  params,
}: {
  params: TVariables;
  tokenType: string;
  token: string | null;
}): Promise<TResult> {
  if (params.communityId) {
    const response = await fetch(
      saveReply(params?.threadId, params.userId, params.communityId),
      {
        method: "POST",
        headers: {
          Authorization: `${tokenType} ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params.reply),
      }
    );
    return response.json();
  }
}

type TVariables = {
  threadId: number;
  userId: string;
  communityId: number | undefined;
  reply: any;
};

type TError = string;
type TContext = unknown;
type TResult = any;

function useSaveReply(): UseMutationResult<
  TResult,
  TError,
  TVariables,
  TContext
> {
  const { tokenType } = useAuth();

  return useMutation(async (params: TVariables) => {
    if (params?.userId && params?.threadId && params?.communityId) {
      const response = await postReply({
        token: getParsedToken(),
        tokenType,
        params,
      });
      return response;
    }
  });
}

export { useSaveReply };
