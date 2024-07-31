import { useQuery, UseQueryResult } from "react-query";

import { getPrimaryRepliesOfThread } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";

import { CommunityType } from "../types/communityType";

async function fetchPrimaryReplies({
  token,
  tokenType,
  threadId,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getPrimaryRepliesOfThread(threadId), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = Array<CommunityType>;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  threadId: number;
};

function useGetPrimaryReplies(
  threadId: number
): UseQueryResult<APIResult, TError> {
  const { token, tokenType } = useAuth();
  return useQuery(
    ["get_primary_replies_thread"],
    async () => {
      const result = await fetchPrimaryReplies({
        token,
        tokenType,
        threadId,
      });
      return result;
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetPrimaryReplies };
