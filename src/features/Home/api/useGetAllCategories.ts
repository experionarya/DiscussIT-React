import { useQuery, UseQueryResult } from "react-query";

import { getAllCategories } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { AllCategoryType } from "src/features/Community/types/categoryType";

async function fetchAllCategoriesList({
  token,
  tokenType,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getAllCategories, {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = Array<AllCategoryType>;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
};

function useGetAllCategories(): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  return useQuery(
    ["get_all_categories_list"],
    async () => {
      const result = await fetchAllCategoriesList({
        token: getParsedToken(),
        tokenType,
      });
      return result;
    },
    {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetAllCategories };
