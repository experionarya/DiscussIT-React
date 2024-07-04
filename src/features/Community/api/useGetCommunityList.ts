import { useQuery, UseQueryResult } from "react-query";

import { getCommunityList } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { CommunityType } from "../types/communityType";

async function fetchCommunityList({
  token,
  tokenType,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getCommunityList, {
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
};

function useGetCommunityList(): UseQueryResult<APIResult, TError> {
  const { token, tokenType } = useAuth();
  return useQuery(
    ["get_community_list"],
    async () => {
      const result = await fetchCommunityList({
        token,
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

export { useGetCommunityList };
