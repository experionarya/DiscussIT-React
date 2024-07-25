import { useMutation, UseMutationResult, useQueryClient } from "react-query";

import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { markAllNotificationHasRead } from "src/utils/urls";

async function markNotificationToRead({
  token,
  tokenType,
  replyIds,
}: {
  replyIds: Array<number>;
  tokenType: string;
  token: string | null;
}): Promise<TResult> {
  const response = await fetch(markAllNotificationHasRead, {
    method: "POST",
    headers: {
      Authorization: `${tokenType} ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(replyIds),
  });
  return response.json();
}

type TVariables = {
  replyIds: Array<number>;
};

type TError = string;
type TContext = unknown;
type TResult = ValidationError;
type ValidationError = { Message?: string };

function useReadAllNotification(): UseMutationResult<
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
      replyIds: params.replyIds,
    });

    queryClient.invalidateQueries(["get_notifications"]);
    return response;
  });
}

export { useReadAllNotification };
