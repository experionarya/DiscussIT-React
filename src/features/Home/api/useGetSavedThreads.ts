import { useCallback } from "react";
import { useQuery, UseQueryResult } from "react-query";

import { getSavedThreadsId } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { useHomeStore } from "../store/homeStore";

async function fetchSavedThread({
  token,
  tokenType,
  userId,
}: TVariables): Promise<any> {
  const response = await fetch(getSavedThreadsId(userId), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = Array<{
  savedPostID: number;
  userID: string;
  threadID: number;
  savedAt: string;
}>;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  userId: string;
};

function useGetSavedThreads(userId: string | undefined): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();

  //to clear book mark data when new api is called
  const clearBookMarkData = useHomeStore(
    useCallback((state: any) => state.clearBookMarkData, [])
  );
  return useQuery(
    ["get_saved_post_list"],
    async () => {
      
      if (!userId) {
        throw new Error("User ID is required");
      }

      const result = await fetchSavedThread({
        token: getParsedToken(),
        tokenType,
        userId,
      });
      clearBookMarkData();
      return result;
    },
    {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      enabled: userId !== undefined,
    }
  );
}

export { useGetSavedThreads };
