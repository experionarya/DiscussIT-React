import { useQuery, UseQueryResult } from "react-query";

import { getCategoryByCommunity } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { CategoryType } from "../types/categoryType";

async function fetchCategoryByCommunity({
  token,
  tokenType,
  communityId,
}: TVariables): Promise<APIResult> {
  console.log("communityId 13", communityId);
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
  communityId: number | undefined;
};

function useGetCategoryByCommunity(
  communityId: number | undefined
): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  console.log("communityId35", communityId);
  return useQuery(
    ["get_category_by_community", communityId],
    async () => {
      // if (communityId) {
      const result = await fetchCategoryByCommunity({
        token: getParsedToken(),
        tokenType,
        communityId,
      });
      return result;
      // }
    },
    {
      enabled: communityId !== undefined,
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetCategoryByCommunity };
