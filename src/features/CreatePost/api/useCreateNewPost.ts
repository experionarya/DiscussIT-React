import { useMutation, UseMutationResult, useQueryClient } from "react-query";

import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { savePost, editPostDetails } from "src/utils/urls";

async function createNewPost({
  token,
  tokenType,
  params,
}: {
  params: TVariables;
  tokenType: string;
  token: string | null;
}): Promise<TResult> {
  const bodyParam = {
    Title: params?.title,
    Content: params?.content,
    Tags: params?.tagNames?.map((item: any, index: number) => item?.label),
    isDraft: params?.isDraft,
  };
  const url =
    params?.userMode !== "Edit" && params?.userMode !== "draft"
      ? savePost(params?.Category, params?.userId, params?.Community)
      : editPostDetails(params?.threadId, params?.userId, params?.communityId);

  const method =
    params.userMode === "Edit" || params.userMode === "draft" ? "PUT" : "POST";
  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: `${tokenType} ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyParam),
  });
  return response.json();
}

type TVariables = {
  Community: number;
  userId: number;
  Category: number;
  title: any;
  tagNames: any;
  content: any;
  userMode: string;
  threadId: number;
  communityId: number;
  isDraft: boolean;
};

type TError = string;
type TContext = unknown;
type TResult = any;
type ValidationError = { Message?: string };

function useCreateNewPost(): UseMutationResult<
  TResult,
  TError,
  TVariables,
  TContext
> {
  const { tokenType } = useAuth();

  return useMutation(async (params: TVariables) => {
    const response = await createNewPost({
      token: getParsedToken(),
      tokenType,
      params,
    });

    return response;
  });
}

export { useCreateNewPost };
