import { useMutation, UseMutationResult, useQueryClient } from "react-query";

import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { singleNotificationHasRead } from "src/utils/urls";

async function markNotificationToRead({
  token,
  tokenType,
  replyId,
}: {
  replyId: number;
  tokenType: string;
  token: string | null;
}): Promise<TResult> {
  const response = await fetch(singleNotificationHasRead(replyId), {
    method: "POST",
    headers: {
      Authorization: `${tokenType} ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

type TVariables = {
  replyId: number;
};

type TError = string;
type TContext = unknown;
type TResult = ValidationError;
type ValidationError = { Message?: string };

function useReadSingleNotification(): UseMutationResult<
  TResult,
  TError,
  TVariables,
  TContext
> {
  const { tokenType } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(async (params: TVariables) => {
    const response = await markNotificationToRead({
      token: getParsedToken(),
      tokenType,
      replyId: params.replyId,
    });

    queryClient.invalidateQueries(["get_notifications"]);
    return response;
  });
}

export { useReadSingleNotification };
