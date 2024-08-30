import { useQuery, UseQueryResult } from "react-query";

import { GetBestAnswer } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

async function fetchGetBestAnswer({
  token,
  tokenType,
  replyId,
}: TVariables): Promise<APIResult> {
  const response = await fetch(GetBestAnswer(replyId), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = number;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  replyId: number;
};

function useGetBestAnswer(replyId: number): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();

  return useQuery(
    ["get_best_answer", replyId],
    async () => {
      const result = await fetchGetBestAnswer({
        token: getParsedToken(),
        tokenType,
        replyId,
      });

      return result;
    },
    {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      enabled: replyId !== undefined,
    }
  );
}

export { useGetBestAnswer };
