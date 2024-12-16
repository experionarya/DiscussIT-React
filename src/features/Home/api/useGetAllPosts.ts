import { useCallback } from "react";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from "react-query";

import { getAllPosts } from "src/utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { useHomeStore } from "../store/homeStore";

import { BookMark } from "src/features/Home/types/bookMarkDataType";
import { getUserIdFromToken } from "src/utils/authenticationHelper/tokenHandler";

const pageLength = 20;
const userID=getUserIdFromToken();

async function fetchAllPosts({
  token,
  tokenType,
  filterBy,
  pageParam,
  userID
}: TVariables): Promise<APIResult> {
  const response = await fetch(getAllPosts(filterBy, pageParam, pageLength,userID), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = { posts: Array<BookMark>; remainingCount: number };

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  filterBy: string;
  pageParam: number;
  userID:string
};

function useGetAllPosts({
  filterBy,
  
}: {
  filterBy: string;
}): UseInfiniteQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  const setAllPost = useHomeStore(useCallback((state) => state.setAllPost, []));

  return useInfiniteQuery(
    ["get_all_post", filterBy],
    async ({ pageParam = 1 }) => {
      const result = await fetchAllPosts({
        token: getParsedToken(),
        tokenType,
        filterBy,
        pageParam,
        userID,
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

      staleTime: 3 * 1000,
      refetchOnWindowFocus: false,
      enabled: filterBy !== "",
    }
  );
}

export { useGetAllPosts };
