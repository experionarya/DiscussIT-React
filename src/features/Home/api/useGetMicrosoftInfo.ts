import { useQuery, UseQueryResult } from "react-query";

import { microsoftInfo } from "src/utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";

async function fetchInformation({
  token,
  tokenType,
}: TVariables): Promise<APIResult> {
  const response = await fetch(microsoftInfo, {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = any;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
};

function useGetMicrosoftInfo(): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();

  const token = localStorage.getItem("token");
  console.log("vuseGetCommunityList", token, tokenType);
  return useQuery(
    ["get_information"],
    async () => {
      const result = await fetchInformation({
        token,
        tokenType,
      });
      return await result;
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetMicrosoftInfo };
