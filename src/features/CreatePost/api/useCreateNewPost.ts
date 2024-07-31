import { useMutation, UseMutationResult, useQueryClient } from "react-query";

import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { savePost } from "src/utils/urls";

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
    Title: params?.Title,
    Content: params?.Description,
    Tags: [params?.TagStatus],
  };
  const response = await fetch(
    savePost(params?.Category, params?.userId, params?.Community),
    {
      method: "POST",
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
  Community: number;
  userId: number;
  Category: number;
  Title: any;
  TagStatus: any;
  Description: any;
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
    console.log("params", params);
    const response = await createNewPost({
      token: getParsedToken(),
      tokenType,
      params,
    });

    return response;
  });
}

export { useCreateNewPost };
