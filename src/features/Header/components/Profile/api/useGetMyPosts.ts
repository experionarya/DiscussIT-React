import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";

import { getMyPosts } from "src/utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { AllPostsType } from "src/features/Community/types/postType";

const pageLength = 20;

async function fetchMyPosts({
  token,
  tokenType,
  userId,
  filterOption,
  sortOption,
  pageParam,
}: TVariables): Promise<APIResult> {
  const response = await fetch(
    getMyPosts(userId, pageParam, pageLength, filterOption, sortOption),
    {
      method: "GET",
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
    }
  );
  return response.json();
}

type APIResult = AllPostsType;

type TError = { message: string };

type TVariables = {
  token: string | null;
  tokenType: string;
  userId: string;
  filterOption: number;
  sortOption: number;
  pageParam: number;
};

function useGetMyPosts({
  userId,
  filterOption,
  sortOption,
}: {
  userId: string | undefined;
  filterOption: number;
  sortOption: number;
}): UseInfiniteQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();

  return useInfiniteQuery(
    ["get_my_post", userId, filterOption, sortOption],
    async ({ pageParam = 1 }) => {
      if (userId) {
        const result = await fetchMyPosts({
          token: getParsedToken(),
          tokenType,
          userId,
          filterOption,
          sortOption,
          pageParam,
        });
        return result;
      }
      return {
        posts: { categoryDescription: "", categoryName: "", threads: [] },
        hasMore: false,
      };
    },
    {
      getNextPageParam: (lastPage: any, allPages: Array<any>) => {
        if (lastPage !== null && lastPage?.posts?.length === pageLength)
          return allPages?.length + 1;
      },
      getPreviousPageParam: (firstPage: any, allPages: Array<any>) => {
        if (firstPage !== null && firstPage?.data?.length === pageLength)
          return allPages?.length - 1;
      },
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      enabled: userId !== undefined,
    }
  );
}

export { useGetMyPosts };
