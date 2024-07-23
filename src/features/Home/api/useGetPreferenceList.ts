import { useQuery, UseQueryResult } from "react-query";

import { getPreferenceList } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

async function fetchPreferenceList({
  token,
  tokenType,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getPreferenceList, {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = Array<any>;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
};

function useGetPreferenceList(): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  return useQuery(
    ["get_preference_list"],
    async () => {
      const result = await fetchPreferenceList({
        token: getParsedToken(),
        tokenType,
      });
      return result;
    },
    {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetPreferenceList };
