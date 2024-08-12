import { useCallback } from "react";
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";

import { getCategorywisePost } from "src/utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { useHomeStore } from "../store/homeStore";

import { BookMark } from "src/features/Home/types/bookMarkDataType";
const pageLength = 20;

async function fetchAllPosts({
  token,
  tokenType,
  communityCategoryId,
  pageParam,
}: TVariables): Promise<any> {
  if (communityCategoryId) {
    const response = await fetch(
      getCategorywisePost(communityCategoryId, pageParam, pageLength),
      {
        method: "GET",
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      }
    );
    return response.json();
  }
}

type APIResult = Array<BookMark>;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  communityCategoryId: number | undefined;
  pageParam: number;
};

function useGetPostByCategories({
  communityCategoryId,
}: {
  communityCategoryId: number | undefined;
}): UseInfiniteQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  const setAllPost = useHomeStore(useCallback((state) => state.setAllPost, []));
  return useInfiniteQuery(
    ["get_all_category_post", communityCategoryId],
    async ({ pageParam = 1 }) => {
      const result = await fetchAllPosts({
        token: getParsedToken(),
        tokenType,
        communityCategoryId,
        pageParam,
      });
      setAllPost(result?.posts);
      return result;
    },
    {
      getNextPageParam: (lastPage: any, allPages: Array<any>) => {
        console.log("lastPage", lastPage, "allPages", allPages);
        if (lastPage !== null && lastPage?.posts?.length === pageLength)
          return allPages?.length + 1;
      },
      getPreviousPageParam: (firstPage: any, allPages: Array<any>) => {
        if (firstPage !== null && firstPage?.data?.length === pageLength)
          return allPages?.length - 1;
      },

      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      enabled: communityCategoryId !== -1,
    }
  );
}

export { useGetPostByCategories };
