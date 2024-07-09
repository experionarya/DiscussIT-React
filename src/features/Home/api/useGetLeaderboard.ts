import { useQuery, UseQueryResult } from "react-query";

import { getTopUsers } from "src/utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { TopUsersType } from "../types/topUsers";

async function fetchTopUers({
  token,
  tokenType,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getTopUsers, {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = Array<TopUsersType>;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
};

function useGetLeaderboard(): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  return useQuery(
    ["get_top_users"],
    async () => {
      const result = await fetchTopUers({
        token: getParsedToken(),
        tokenType,
      });
      return result;
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetLeaderboard };
