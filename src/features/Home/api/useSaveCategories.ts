import {
  useMutation,
  UseMutationResult,
  useQueryClient,
  UseQueryResult,
} from "react-query";

import { saveAllCategories } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { AllCategoryType } from "src/features/Community/types/categoryType";

async function saveCategories({
  token,
  tokenType,
  params,
}: TVariables): Promise<APIResult> {
  const response = await fetch(saveAllCategories, {
    method: "POST",
    headers: {
      Authorization: `${tokenType} ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return response.json();
}

type APIResult = Array<AllCategoryType>;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  params: any;
};

function useSaveCategories(): UseMutationResult<any, TError, any, unknown> {
  const { tokenType } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    async (params: any) => {
      const result = await saveCategories({
        token: getParsedToken(),
        tokenType: tokenType,
        params: params,
      });
      return result;
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("get_preference_list", {
          refetchInactive: true,
        });
      },
    }
  );
}

export { useSaveCategories };
