import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { markAsBestAnswer } from "src/utils/urls";
import { MarkAsBestAnswerType } from "../types/markasbestanswer";

async function postMarkAsBestAnswer({
  token,
  tokenType,
  replyId,
  createdBy,
}: {
  replyId: number;
  createdBy: string;
  tokenType: string;
  token: string | null;
}): Promise<TResult> {
  const response = await fetch(markAsBestAnswer(replyId, createdBy), {
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

type TVariables = MarkAsBestAnswerType;
type TError = string;
type TContext = unknown;
type TResult = any;

function useMarkAsBestAnswer(): UseMutationResult<
  TResult,
  TError,
  TVariables,
  TContext
> {
  const { tokenType } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(async (params: TVariables) => {
    const token = getParsedToken();
    const response = await postMarkAsBestAnswer({
      token,
      tokenType,
      replyId: params.replyId,
      createdBy: params.createdBy,
    });
    queryClient.invalidateQueries(["get_best_answer"]);

    return response;
  });
}

export { useMarkAsBestAnswer };
