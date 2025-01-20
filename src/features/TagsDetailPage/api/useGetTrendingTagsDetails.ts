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
  userID,
}: TVariables): Promise<APIResult> {
  const response = await fetch(
    getTrendingTagsDetails(
      tagName,
      pageParam,
      pageLength,
      filterOption,
      sortOption,
      userID
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
  userID: string;
};

function useGetTrendingTagsDetails({
  tagName,
  filterOption,
  sortOption,
  userID,
}: {
  tagName: string;
  filterOption: number;
  sortOption: number;
  userID: string | undefined;
}): UseInfiniteQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  const token = getParsedToken();

  return useInfiniteQuery(
    ["get_trending_tags_details", tagName, filterOption, sortOption],
    async ({ pageParam = 1 }) => {
      if (tagName && token && userID) {
        return await fetchTrendingTagsDetails({
          token,
          tokenType,
          tagName,
          pageParam,
          filterOption,
          sortOption,
          userID,
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
      staleTime: 3 * 1000,
      refetchOnWindowFocus: false,
      enabled: Boolean(tagName && token && userID),
    }
  );
}

export { useGetTrendingTagsDetails };
