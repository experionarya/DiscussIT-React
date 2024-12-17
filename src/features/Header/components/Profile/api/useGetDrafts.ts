import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";

import { getMyDrafts } from "src/utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { ThreadType } from "src/features/Community/types/postType";

const pageLength = 20;

async function fetchMyDrafts({
  token,
  tokenType,
  userId,
  pageParam,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getMyDrafts(userId, pageParam, pageLength), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = { threads: Array<ThreadType>; hasMore: boolean };

type TError = { message: string };

type TVariables = {
  token: string | null;
  tokenType: string;
  userId: string;
  pageParam: number;
};

function useGetMyDrafts({
  userId,
}: {
  userId: string | undefined;
}): UseInfiniteQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();

  return useInfiniteQuery(
    ["get_my_draft", userId],
    async ({ pageParam = 1 }) => {
      if (userId) {
        const result = await fetchMyDrafts({
          token: getParsedToken(),
          tokenType,
          userId,
          pageParam,
        });
        return result;
      }
      return {
        categoryDescription: "",
        categoryName: "",
        threads: [],
      };
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage !== null && lastPage?.threads.length === pageLength)
          return allPages?.length + 1;
        return undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => {
        if (firstPage !== null && firstPage?.threads?.length === pageLength)
          return allPages?.length - 1;
        return undefined;
      },
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      enabled: userId !== undefined,
    }
  );
}

export { useGetMyDrafts };
