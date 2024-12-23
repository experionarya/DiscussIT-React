import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";

import { getAllPostsByCategory } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { AllPostsType } from "../types/postType";

const pageLength = 20;

async function fetchPostsByCategory({
  token,
  tokenType,
  communityCategoryMappingId,
  pageParam,
  filterOption,
  sortOption,
  userID,
}: TVariables): Promise<APIResult> {
  const response = await fetch(
    getAllPostsByCategory(
      communityCategoryMappingId,
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
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();
  return data as APIResult;
}

type APIResult = AllPostsType;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  communityCategoryMappingId: number;
  pageParam: number;
  filterOption: number;
  sortOption: number;
  userID: string;
};

function useGetAllPosts({
  communityCategoryMappingId,
  filterOption,
  sortOption,
  userID,
}: {
  communityCategoryMappingId: number | undefined;
  filterOption: number;
  sortOption: number;
  userID: string | undefined;
}): UseInfiniteQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  const token = getParsedToken();

  return useInfiniteQuery(
    [
      "get_all_posts_by_category",
      communityCategoryMappingId,
      filterOption,
      sortOption,
    ],
    async ({ pageParam = 1 }) => {
      if (communityCategoryMappingId && token && userID) {
        return await fetchPostsByCategory({
          token: getParsedToken(),
          tokenType,
          communityCategoryMappingId,
          pageParam,
          filterOption,
          sortOption,
          userID,
        });
      }
      return null;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage !== null && lastPage?.threads?.length === pageLength)
          return allPages?.length + 1;
        return undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => {
        if (firstPage !== null && firstPage?.threads?.length === pageLength)
          return allPages?.length - 1;
        return undefined;
      },
      staleTime: 3 * 1000,
      refetchOnWindowFocus: false,
      enabled: communityCategoryMappingId !== undefined && token !== null,
    }
  );
}

export { useGetAllPosts };
