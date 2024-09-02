import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";

import { getTrendingTagsDetails } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { TrendingTagDetailsType } from "../types/trendingTagsDetails";

const pageLength = 20;

async function fetchTrendingTagsDetails({
  token,
  tokenType,
  tagName,
  pageParam,
  filterOption,
  sortOption,
}: TVariables): Promise<APIResult> {
  const response = await fetch(
    getTrendingTagsDetails(
      tagName,
      pageParam,
      pageLength,
      filterOption,
      sortOption
    ),
    {
      method: "GET",
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending tags details");
  }

  return response.json();
}

type APIResult = TrendingTagDetailsType;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  tagName: string;
  pageParam: number;
  filterOption: number;
  sortOption: number;
};

function useGetTrendingTagsDetails({
  tagName,
  filterOption,
  sortOption,
}: {
  tagName: string;
  filterOption: number;
  sortOption: number;
}): UseInfiniteQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  const token = getParsedToken();

  return useInfiniteQuery(
    ["get_trending_tags_details", tagName, filterOption, sortOption],
    async ({ pageParam = 1 }) => {
      if (tagName && token) {
        return await fetchTrendingTagsDetails({
          token,
          tokenType,
          tagName,
          pageParam,
          filterOption,
          sortOption,
        });
      }
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (
          lastPage !== null &&
          lastPage?.searchThreadDtoList.length === pageLength
        )
          return allPages?.length + 1;
        return undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => {
        if (
          firstPage !== null &&
          firstPage?.searchThreadDtoList?.length === pageLength
        )
          return allPages?.length - 1;
        return undefined;
      },
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      enabled: Boolean(tagName && token),
    }
  );
}

export { useGetTrendingTagsDetails };
