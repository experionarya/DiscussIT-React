import { useQuery, UseQueryResult } from "react-query";

import { globalSearch } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { searchList } from "../types/globalSeacrhType";

async function fetchGloablSearch({
  token,
  tokenType,
  searchParam,
}: TVariables): Promise<APIResult> {
  const response = await fetch(globalSearch(searchParam), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = searchList;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  searchParam: string;
};

function useGetGlobalSearch(
  searchParam: string
): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();

  return useQuery(
    ["get_gloabl_search", searchParam],
    async () => {
      const result = await fetchGloablSearch({
        token: getParsedToken(),
        tokenType,
        searchParam,
      });

      return result;
    },
    {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      enabled: searchParam !== undefined && searchParam !== "",
    }
  );
}

export { useGetGlobalSearch };
