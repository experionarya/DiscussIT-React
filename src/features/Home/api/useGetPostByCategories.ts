import { useCallback } from "react";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from "react-query";

import { getCategorywisePost } from "src/utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { useHomeStore } from "../store/homeStore";

import { BookMark } from "src/features/Home/types/bookMarkDataType";

async function fetchAllPosts({
  token,
  tokenType,
  communityCategoryId,
  count,
}: TVariables): Promise<any> {
  if (communityCategoryId) {
    const response = await fetch(
      getCategorywisePost(communityCategoryId, count),
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
  count: number;
};

function useGetPostByCategories({
  communityCategoryId,
  count,
}: {
  communityCategoryId: number | undefined;
  count: number;
}): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  const setAllPost = useHomeStore(useCallback((state) => state.setAllPost, []));
  return useQuery(
    ["get_post_by_categories", communityCategoryId, count],

    async () => {
      const result = await fetchAllPosts({
        token: getParsedToken(),
        tokenType,
        communityCategoryId,
        count,
      });
      setAllPost(result);
      return result;
    },
    {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      enabled: communityCategoryId !== undefined,
    }
  );
}

export { useGetPostByCategories };
