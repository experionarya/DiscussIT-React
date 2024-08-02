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

async function fetchAllPosts({
  token,
  tokenType,
  filterBy,
  count,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getAllPosts(filterBy, count), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = Array<BookMark>;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  filterBy: string;
  count: number;
};

function useGetAllPosts({
  filterBy,
  count,
}: {
  filterBy: string;
  count: number;
}): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  const setAllPost = useHomeStore(useCallback((state) => state.setAllPost, []));
  return useQuery(
    ["get_all_post", filterBy, count],
    async () => {
      const result = await fetchAllPosts({
        token: getParsedToken(),
        tokenType,
        filterBy,
        count,
      });

      setAllPost(result);
      return result;
    },
    {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetAllPosts };
