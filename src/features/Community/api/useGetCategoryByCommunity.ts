import { useQuery, UseQueryResult } from "react-query";

import { getCategoryByCommunity } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";

import { CategoryType } from "../types/categoryType";

async function fetchCategoryByCommunity({
  token,
  tokenType,
  communityId,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getCategoryByCommunity(communityId), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = Array<CategoryType>;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  communityId: number;
};

function useGetCategoryByCommunity(
  communityId: number | undefined
): UseQueryResult<APIResult, TError> {
  const { token, tokenType } = useAuth();
  console.log("communityId- 35", communityId);
  return useQuery(
    ["get_category_by_community"],
    async () => {
      if (communityId) {
        const result = await fetchCategoryByCommunity({
          token,
          tokenType,
          communityId,
        });
        return result;
      }
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetCategoryByCommunity };
