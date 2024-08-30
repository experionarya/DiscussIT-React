import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { UnmarkBestAnswer } from "src/utils/urls";
import { UnmarkBestAnswerType } from "../types/markasbestanswer";

async function postUnmarkBestAnswer({
  token,
  tokenType,
  replyId,
  modifiedBy,
}: {
  replyId: number;
  modifiedBy: string;
  tokenType: string;
  token: string | null;
}): Promise<TResult> {
  const response = await fetch(UnmarkBestAnswer(replyId, modifiedBy), {
    method: "POST",
    headers: {
      Authorization: `${tokenType} ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to mark as best answer.");
  }
  return response.json();
}

type TVariables = UnmarkBestAnswerType;
type TError = string;
type TContext = unknown;
type TResult = any;

function useUnmarkBestAnswer(): UseMutationResult<
  TResult,
  TError,
  TVariables,
  TContext
> {
  const { tokenType } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(async (params: TVariables) => {
    const token = getParsedToken();
    const response = await postUnmarkBestAnswer({
      token,
      tokenType,
      replyId: params.replyId,
      modifiedBy: params.modifiedBy,
    });
    queryClient.invalidateQueries(["get_best_answer"]);
    return response;
  });
}

export { useUnmarkBestAnswer };
