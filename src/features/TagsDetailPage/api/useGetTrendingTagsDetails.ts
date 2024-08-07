import { useQuery, UseQueryResult } from "react-query";

import { getTrendingTagsDetails } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { TrendingTagDetailsType } from "../types/trendingTagsDetails";

async function fetchTrendingTagsDetails({
  token,
  tokenType,
  tagName,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getTrendingTagsDetails(tagName), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = TrendingTagDetailsType;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  tagName: string;
};

function useGetTrendingTagsDetails(
  tagName: string
): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  return useQuery(
    ["get_trending_tags_details"],
    async () => {
      const result = await fetchTrendingTagsDetails({
        token: getParsedToken(),
        tokenType,
        tagName,
      });
      return result;
    },
    {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetTrendingTagsDetails };
