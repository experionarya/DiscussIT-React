import { useQuery, UseQueryResult } from "react-query";

import { getTrendingTags } from "src/utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { TrendingTagType } from "../types/trendingTags";

async function fetchTrendingTags({
  token,
  tokenType,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getTrendingTags, {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = Array<TrendingTagType>;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
};

function useGetTrendingTags(): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  return useQuery(
    ["get_trending_tags"],
    async () => {
      const result = await fetchTrendingTags({
        token: getParsedToken(),
        tokenType,
      });
      return result;
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetTrendingTags };
